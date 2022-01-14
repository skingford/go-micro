package dao

import (
	"context"
	"go-micro/shared/id"
	mgutil "go-micro/shared/mongo"
	"go-micro/shared/mongo/objid"
	mongotesting "go-micro/shared/mongo/testing"
	"go.mongodb.org/mongo-driver/bson"
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

	_, err = m.col.InsertMany(c, []interface{}{
		bson.M{
			mgutil.IDFieldName: objid.MustFromID(id.AccountID("5f7c245ab0361e00ffb9fd6f")),
			openIDField:        "openid_1",
		},
		bson.M{
			mgutil.IDFieldName: objid.MustFromID(id.AccountID("5f7c245ab0361e00ffb9fd70")),
			openIDField:        "openid_2",
		},
	})
	if err != nil {
		t.Fatalf("cannot insert initial values: %v", err)
	}

	mgutil.NewObjIDWithValue(id.AccountID("5f7c245ab0361e00ffb9fd71"))

	cases := []struct {
		name   string
		openID string
		want   string
	}{
		{
			name:   "existing_user",
			openID: "openid_1",
			want:   "5f7c245ab0361e00ffb9fd6f",
		},
		{
			name:   "another_existing_user",
			openID: "openid_2",
			want:   "5f7c245ab0361e00ffb9fd70",
		},
		{
			name:   "new_user",
			openID: "openid_3",
			want:   "5f7c245ab0361e00ffb9fd71",
		},
	}

	for _, cc := range cases {
		t.Run(cc.name, func(t *testing.T) {
			aid, err := m.ResolveAccountID(
				context.Background(), cc.openID)
			if err != nil {
				t.Errorf("faild resolve account id for %q: %v", cc.openID, err)
			}
			if aid != cc.want {
				t.Errorf("resolve account id: want: %q; got: %q", cc.want, aid)
			}
		})
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
