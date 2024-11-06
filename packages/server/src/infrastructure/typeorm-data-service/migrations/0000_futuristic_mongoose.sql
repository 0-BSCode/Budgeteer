CREATE TYPE "public"."transaction_type" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"description" varchar(255) NOT NULL,
	"type" "transaction_type" DEFAULT 'EXPENSE' NOT NULL,
	"amount" numeric DEFAULT '0' NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL
);
