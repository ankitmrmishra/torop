CREATE TABLE "inviations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"token" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	"invited_by" uuid NOT NULL,
	CONSTRAINT "inviations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "inviations" ADD CONSTRAINT "inviations_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workspace_invitation_workspace_idx" ON "inviations" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "workspace_invitation_email_idx" ON "inviations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "workspace_invitation_token_idx" ON "inviations" USING btree ("token");