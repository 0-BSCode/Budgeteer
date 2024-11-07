CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"password" varchar(255) NOT NULL,
	"profile_picture" varchar(255) NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
