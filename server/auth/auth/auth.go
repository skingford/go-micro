// Package auth /*
package auth

import (
	"context"
	authpb "go-micro/auth/api/gen/v1"

	"go.uber.org/zap"
)

type Service struct {
	Logger *zap.Logger
	authpb.UnimplementedAuthServiceServer
}

func (s *Service) Login(c context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	s.Logger.Info("login", zap.String("code", req.Code))
	return &authpb.LoginResponse{
		AccessToken: "login code is" + req.Code,
		ExpiresIn:   7200,
	}, nil
}
