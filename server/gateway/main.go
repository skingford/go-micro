/*
 * @Author: kingford
 * @Date: 2021-10-07 20:35:36
 * @LastEditTime: 2021-10-07 21:37:09
 */
package main

import (
	"context"
	authpb "go-micro/auth/api/gen/v1"
	"log"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func main() {
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()

	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{}))

	err := authpb.RegisterAuthServiceHandlerFromEndpoint(
		c, mux, "localhost:8081",
		[]grpc.DialOption{grpc.WithInsecure()},
	)

	if err != nil {
		log.Fatalf("cannot register auth server: %v", err)
	}

	log.Fatal(http.ListenAndServe(":8080", mux))
}
