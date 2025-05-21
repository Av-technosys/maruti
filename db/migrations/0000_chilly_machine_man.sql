CREATE TABLE "userData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar,
	"password" varchar,
	"roomNumber" varchar,
	"adharImage" varchar,
	"registoryPDF" varchar,
	"role" varchar
);
