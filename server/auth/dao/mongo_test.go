package dao

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"testing"
)

func TestMongo_ResolveAccountID(t *testing.T) {
	c := context.Background()

	mc, err := mongo.Connect(
		c,
		options.Client().ApplyURI(
			"mongodb://cool:123456@bcore.top:27017/coolcar?readPreference=primary&ssl=false",
		),
	)

	if err != nil {
		t.Fatalf("could not connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))
	id, err := m.ResolveAccountID(c, "123")

	if err != nil {
		t.Errorf("failed to resolve account id for 123:%v", err)
	} else {
		want := "61c49706cf558d83addaba6e"
		if id != want {
			t.Errorf("resolve account id: want:%q,got:%q", want, id)
		}
	}

}
