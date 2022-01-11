package dao

import (
	"context"
	mongotesting "go-micro/shared/mongo/testing"
	"os"
	"testing"
)

func TestMongo_ResolveAccountID(t *testing.T) {
	c := context.Background()
	mc, err := mongotesting.NewClient(c)
	if err != nil {
		t.Fatalf("cannot connect mongodb: %v", err)
	}

	m := NewMongo(mc.Database("coolcar"))

	id, err := m.ResolveAccountID(c, "123")

	if err != nil {
		t.Errorf("failed to resolve account id for 123:%v", err)
	} else {
		want := "61ddb902326cb9515740e088"
		if id != want {
			t.Errorf("resolve account id: want:%q,got:%q", want, id)
		}
	}

}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
