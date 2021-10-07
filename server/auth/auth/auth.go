/*
 * @Author: kingford
 * @Date: 2021-10-07 18:54:16
 * @LastEditTime: 2021-10-07 19:04:07
 */
package auth

import (
	"context"
	authpb "go-micro/auth/api/gen/v1"

	"go.uber.org/zap"
)

type Service struct {
	Logger zap.Logger
}

func (s *Service) Login(c context.Context, req *authpb.LoginRequest) (string, error) {
	s.Logger.Info("login", zap.String("code", req.Code))
	return "", nil
}
