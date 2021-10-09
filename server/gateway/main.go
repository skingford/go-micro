/*
 * @Author: kingford
 * @Date: 2021-10-07 20:35:36
 * @LastEditTime: 2021-10-09 22:33:38
 */
package main

import (
	"context"
	authpb "go-micro/auth/api/gen/v1"
	"log"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()

	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard,
		&runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				// 枚举字段的值使用数字
				UseEnumNumbers: true,
				// 传给 clients 的 json key 使用下划线 `_`
				UseProtoNames: true,
				// 这里说明应使用 access_token
				// AccessToken string `protobuf:"bytes,1,opt,name=access_token,json=accessToken,proto3" json:"access_token,omitempty"`

			},
			UnmarshalOptions: protojson.UnmarshalOptions{
				// 忽略 client 发送的不存在的 poroto 字段
				DiscardUnknown: true,
			},
		},
	))

	err := authpb.RegisterAuthServiceHandlerFromEndpoint(
		c, mux, "localhost:8081",
		[]grpc.DialOption{grpc.WithInsecure()},
	)

	if err != nil {
		log.Fatalf("cannot register auth server: %v", err)
	}

	log.Fatal(http.ListenAndServe(":8080", mux))
}
