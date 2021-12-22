package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	c := context.Background()

	// "mongodb://user:password@localhost:27017".
	mc, err := mongo.Connect(c,
		options.
			Client().
			ApplyURI("mongodb://root:123456@bcore.top:27017/admin?readPreference=primary&ssl=false"))
	if err != nil {
		panic(err)
	}
	defer func(mc *mongo.Client, ctx context.Context) {
		err := mc.Disconnect(ctx)
		if err != nil {
			panic(err)
		}
	}(mc, c)

	col := mc.Database("admin").Collection("account")
	insertRows(c, col)
}

func insertRows(c context.Context, col *mongo.Collection) {
	res, err := col.InsertMany(c, []interface{}{
		bson.M{
			"open_id": "123",
		},
		bson.M{
			"open_id": "456",
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v", res)
}
