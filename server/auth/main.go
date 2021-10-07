/*
 * @Author: kingford
 * @Date: 2021-10-07 18:53:59
 * @LastEditTime: 2021-10-07 21:34:13
 */
package main

import (
	authpb "go-micro/auth/api/gen/v1"
	"go-micro/auth/auth"
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

	s := grpc.NewServer()

	authpb.RegisterAuthServiceServer(
		s,
		&auth.Service{
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
