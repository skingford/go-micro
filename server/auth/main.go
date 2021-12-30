package main

import (
	"context"
	authpb "go-micro/auth/api/gen/v1"
	"go-micro/auth/auth"
	"go-micro/auth/dao"
	"go-micro/auth/wechat"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net"

	"go.uber.org/zap"
	"google.golang.org/grpc"
)

func main() {

	logger, err := newZapLogger()
	if err != nil {
		log.Fatal("zap.NewDevelopment error:", err)
	}

	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatal("net.Listen error:", err)
	}

	// mongodb
	c := context.Background()
	mongoClient, err := mongo.Connect(
		c,
		options.Client().ApplyURI(
			"mongodb://cool:123456@bcore.top:27017/coolcar?readPreference=primary&ssl=false",
		),
	)
	if err != nil {
		logger.Fatal("could not connect mongodb", zap.Error(err))
	}

	s := grpc.NewServer()
	authpb.RegisterAuthServiceServer(
		s,
		&auth.Service{
			OpenIDResolver: &wechat.Service{
				AppID:     "wx33b1e737d2068b8a",
				AppSecret: "b1dd74d3895f1fdba37343548ddd07c6",
			},
			Mongo:  dao.NewMongo(mongoClient.Database("coolcar")),
			Logger: logger,
		},
	)
	err = s.Serve(lis)
	logger.Fatal("s.Serve error:", zap.Error(err))
}

func newZapLogger() (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.TimeKey = "timestamp"
	return cfg.Build()
}
