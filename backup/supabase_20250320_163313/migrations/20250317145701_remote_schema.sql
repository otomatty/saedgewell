create extension if not exists "moddatetime" with schema "public" version '1.0';

create type "public"."metric_type" as enum ('development_experience', 'project_count', 'article_count', 'personal_project_count');

create type "public"."site_status" as enum ('development', 'staging', 'production');

create table "public"."admin_users" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "is_active" boolean not null default true
);


alter table "public"."admin_users" enable row level security;

create table "public"."admin_users_history" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "action" text not null,
    "performed_by" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."admin_users_history" enable row level security;

create table "public"."audit_logs" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "action" text not null,
    "entity_type" text not null,
    "entity_id" uuid,
    "old_values" jsonb,
    "new_values" jsonb,
    "ip_address" inet,
    "user_agent" text,
    "status" text not null default 'success'::text,
    "error_message" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."audit_logs" enable row level security;

create table "public"."blog_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."blog_categories" enable row level security;

create table "public"."blog_posts" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "description" text not null,
    "content" text not null,
    "thumbnail_url" text,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "estimated_reading_time" integer not null,
    "status" text not null default 'draft'::text
);


alter table "public"."blog_posts" enable row level security;

create table "public"."blog_posts_categories" (
    "post_id" uuid not null,
    "category_id" uuid not null
);


alter table "public"."blog_posts_categories" enable row level security;

create table "public"."contact_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(255) not null,
    "description" text,
    "icon" character varying(255),
    "created_at" timestamp with time zone default now()
);


alter table "public"."contact_categories" enable row level security;

create table "public"."contact_chat_messages" (
    "id" uuid not null default gen_random_uuid(),
    "chat_id" uuid not null,
    "sender_type" character varying(20) not null,
    "message_text" text not null,
    "faq_id" uuid,
    "is_escalation_request" boolean not null default false,
    "timestamp" timestamp with time zone default now()
);


alter table "public"."contact_chat_messages" enable row level security;

create table "public"."contact_chats" (
    "id" uuid not null default gen_random_uuid(),
    "category_id" uuid not null,
    "profile_id" uuid not null,
    "page_url" text,
    "status" character varying(20) not null default 'open'::character varying,
    "created_at" timestamp with time zone default now()
);


alter table "public"."contact_chats" enable row level security;

create table "public"."email_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "email_id" uuid,
    "file_name" text not null,
    "file_type" text not null,
    "file_size" integer not null,
    "file_path" text,
    "created_at" timestamp with time zone default now(),
    "attachment_id" text,
    "is_downloaded" boolean default false,
    "downloaded_at" timestamp with time zone
);


alter table "public"."email_attachments" enable row level security;

create table "public"."email_replies" (
    "id" uuid not null default gen_random_uuid(),
    "original_email_id" uuid,
    "gmail_message_id" text not null,
    "from_email" text not null,
    "to_email" text[] not null,
    "cc_email" text[],
    "bcc_email" text[],
    "subject" text not null,
    "body_text" text,
    "body_html" text,
    "sent_at" timestamp with time zone not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."email_replies" enable row level security;

create table "public"."email_settings" (
    "id" uuid not null default gen_random_uuid(),
    "auto_archive_after_days" integer,
    "signature" text,
    "notification_enabled" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "last_sync_at" timestamp with time zone
);


alter table "public"."email_settings" enable row level security;

create table "public"."emails" (
    "id" uuid not null default gen_random_uuid(),
    "gmail_message_id" text not null,
    "thread_id" text not null,
    "from_email" text not null,
    "from_name" text,
    "to_email" text[] not null,
    "cc_email" text[],
    "bcc_email" text[],
    "subject" text not null,
    "body_text" text,
    "body_html" text,
    "received_at" timestamp with time zone not null,
    "is_read" boolean default false,
    "is_archived" boolean default false,
    "is_starred" boolean default false,
    "labels" text[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "has_attachments" boolean default false
);


alter table "public"."emails" enable row level security;

create table "public"."estimate_features" (
    "id" uuid not null default gen_random_uuid(),
    "estimate_id" uuid,
    "name" text not null,
    "description" text not null,
    "price" integer not null,
    "duration" numeric not null,
    "is_required" boolean not null default false,
    "category" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."estimate_features" enable row level security;

create table "public"."estimate_requirements" (
    "id" uuid not null default gen_random_uuid(),
    "estimate_id" uuid,
    "has_design" boolean not null default false,
    "design_format" text,
    "has_brand_guidelines" boolean not null default false,
    "has_logo" boolean not null default false,
    "has_images" boolean not null default false,
    "has_icons" boolean not null default false,
    "has_custom_fonts" boolean not null default false,
    "has_content" boolean not null default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."estimate_requirements" enable row level security;

create table "public"."estimates" (
    "id" uuid not null default gen_random_uuid(),
    "contact_id" uuid,
    "project_type" text not null,
    "description" text not null,
    "deadline" text not null,
    "base_cost" integer not null,
    "rush_fee" integer not null default 0,
    "total_cost" integer not null,
    "status" text not null default 'draft'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."estimates" enable row level security;

create table "public"."faqs" (
    "id" uuid not null default gen_random_uuid(),
    "category_id" uuid not null,
    "question" text not null,
    "answer" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."faqs" enable row level security;

create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "message_id" uuid not null,
    "file_name" character varying(255) not null,
    "file_url" text not null,
    "file_size" bigint not null,
    "mime_type" character varying(255) not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."files" enable row level security;

create table "public"."focus_intervals" (
    "id" uuid not null default uuid_generate_v4(),
    "session_id" uuid not null,
    "interval_type" character varying(20) not null,
    "started_at" timestamp with time zone not null,
    "ended_at" timestamp with time zone,
    "created_at" timestamp with time zone default now()
);


create table "public"."focus_sessions" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "project_id" uuid,
    "task_id" uuid,
    "knowledge_page_id" uuid,
    "started_at" timestamp with time zone not null,
    "ended_at" timestamp with time zone,
    "status" character varying(20) not null,
    "focus_score" integer,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."focus_sessions" enable row level security;

create table "public"."github_contributions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "contribution_date" date not null,
    "contribution_count" integer not null default 0,
    "lines_added" integer not null default 0,
    "lines_deleted" integer not null default 0,
    "commit_count" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."github_contributions" enable row level security;

create table "public"."github_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "username" text not null,
    "access_token" text not null,
    "auto_sync" boolean default false,
    "last_synced_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "repository" text not null default 'saedgewell-portfolio'::text
);


alter table "public"."github_settings" enable row level security;

create table "public"."gmail_credentials" (
    "id" uuid not null default gen_random_uuid(),
    "access_token" text not null,
    "refresh_token" text not null,
    "token_type" text not null,
    "expiry_date" timestamp with time zone not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."gmail_credentials" enable row level security;

create table "public"."knowledge_page_collaborators" (
    "id" uuid not null default gen_random_uuid(),
    "page_id" uuid not null,
    "user_id" uuid not null,
    "is_last_editor" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."knowledge_page_collaborators" enable row level security;

create table "public"."knowledge_page_details" (
    "id" uuid not null default gen_random_uuid(),
    "page_id" uuid not null,
    "lines" jsonb not null default '[]'::jsonb,
    "icons" text[] not null default '{}'::text[],
    "files" text[] not null default '{}'::text[],
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."knowledge_page_details" enable row level security;

create table "public"."knowledge_page_links" (
    "id" uuid not null default gen_random_uuid(),
    "source_page_id" uuid not null,
    "target_page_id" uuid not null,
    "hop_level" integer not null default 1,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."knowledge_page_links" enable row level security;

create table "public"."knowledge_pages" (
    "id" uuid not null default gen_random_uuid(),
    "project_id" uuid not null,
    "scrapbox_id" text not null,
    "title" text not null,
    "image_url" text,
    "descriptions" text[] not null default '{}'::text[],
    "pin_status" integer not null default 0,
    "views" integer not null default 0,
    "linked_count" integer not null default 0,
    "commit_id" text,
    "page_rank" double precision not null default 0,
    "persistent" boolean not null default true,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null,
    "accessed_at" timestamp with time zone,
    "last_accessed_at" timestamp with time zone,
    "snapshot_created_at" timestamp with time zone,
    "snapshot_count" integer not null default 0
);


alter table "public"."knowledge_pages" enable row level security;

create table "public"."knowledge_projects" (
    "id" uuid not null default gen_random_uuid(),
    "project_name" text not null,
    "total_pages" integer not null default 0,
    "last_synced_at" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "scrapbox_cookie" text,
    "auto_sync_enabled" boolean not null default false,
    "is_private" boolean not null default false
);


alter table "public"."knowledge_projects" enable row level security;

create table "public"."knowledge_sync_logs" (
    "id" uuid not null default gen_random_uuid(),
    "project_id" uuid not null,
    "sync_started_at" timestamp with time zone not null,
    "sync_completed_at" timestamp with time zone,
    "status" text not null,
    "error_message" text,
    "pages_processed" integer not null default 0,
    "pages_updated" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."knowledge_sync_logs" enable row level security;

create table "public"."knowledge_users" (
    "id" uuid not null default gen_random_uuid(),
    "scrapbox_id" text not null,
    "name" text not null,
    "display_name" text not null,
    "photo_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."knowledge_users" enable row level security;

create table "public"."metrics" (
    "id" uuid not null default uuid_generate_v4(),
    "type" metric_type not null,
    "value" integer not null,
    "unit" text not null,
    "display_name" text not null,
    "description" text,
    "icon" text not null,
    "href" text not null,
    "cta" text not null,
    "sort_order" integer not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."metrics" enable row level security;

create table "public"."notification_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "project_updates" boolean default true,
    "chat_messages" boolean default true,
    "milestones" boolean default true,
    "documents" boolean default true,
    "system_notifications" boolean default true,
    "email_notifications" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."notification_settings" enable row level security;

create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text not null,
    "content" text not null,
    "type" text not null,
    "link" text,
    "is_read" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."notifications" enable row level security;

create table "public"."otp_challenges" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "challenge_type" text not null,
    "challenge_code" text not null,
    "verification_code" text,
    "attempts" integer not null default 0,
    "is_verified" boolean not null default false,
    "expires_at" timestamp with time zone not null default timezone('utc'::text, (now() + '00:05:00'::interval)),
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."otp_challenges" enable row level security;

create table "public"."otp_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "is_enabled" boolean not null default false,
    "secret_key" text,
    "backup_codes" text[] default ARRAY[]::text[],
    "last_used_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."otp_settings" enable row level security;

create table "public"."permissions" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."permissions" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "avatar_url" text,
    "is_active" boolean not null default true,
    "last_sign_in_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."profiles" enable row level security;

create table "public"."project_github_integrations" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "repository_url" text not null,
    "repository_name" text not null,
    "repository_owner" text not null,
    "branch" text not null default 'main'::text,
    "last_commit_sha" text,
    "last_synced_at" timestamp with time zone,
    "webhook_secret" text,
    "access_token" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."project_github_integrations" enable row level security;

create table "public"."project_milestones" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "title" text not null,
    "description" text,
    "due_date" timestamp with time zone,
    "status" text not null,
    "progress" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."project_milestones" enable row level security;

create table "public"."project_progress_logs" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "milestone_id" uuid,
    "task_id" uuid,
    "log_type" text not null,
    "description" text not null,
    "hours_spent" numeric,
    "created_at" timestamp with time zone default now()
);


alter table "public"."project_progress_logs" enable row level security;

create table "public"."projects" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "name" character varying(100) not null,
    "emoji" character varying(10),
    "description" text,
    "is_archived" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "last_activity_at" timestamp with time zone not null default now()
);


alter table "public"."projects" enable row level security;

create table "public"."role_audit_logs" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "action" text not null,
    "role_name" text not null,
    "role_type" text not null,
    "performed_by" uuid not null,
    "performed_at" timestamp with time zone default now()
);


alter table "public"."role_audit_logs" enable row level security;

create table "public"."role_permissions" (
    "id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null,
    "permission_id" uuid not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."role_permissions" enable row level security;

create table "public"."role_policies" (
    "id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null,
    "resource_type" text not null,
    "action" text not null,
    "conditions" jsonb,
    "effect" text not null,
    "priority" integer not null default 0,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."role_policies" enable row level security;

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "type" text not null default 'user'::text
);


create table "public"."session_policies" (
    "id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null,
    "max_sessions" integer,
    "session_timeout" interval not null default '24:00:00'::interval,
    "require_otp" boolean not null default false,
    "ip_restriction" text[],
    "time_restriction" jsonb,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."session_policies" enable row level security;

create table "public"."site_settings" (
    "id" uuid not null default gen_random_uuid(),
    "site_status" site_status not null default 'development'::site_status,
    "maintenance_mode" boolean not null default false,
    "is_development_banner_enabled" boolean not null default true,
    "site_name" text not null default 'Saedgewell'::text,
    "site_description" text not null default '菅井瑛正のポートフォリオサイト'::text,
    "site_keywords" text[] not null default ARRAY['プロダクトエンジニア'::text, 'Web開発'::text, 'Next.js'::text, 'React'::text, 'TypeScript'::text],
    "og_image_url" text,
    "favicon_url" text,
    "robots_txt_content" text,
    "enable_blog" boolean not null default true,
    "enable_works" boolean not null default true,
    "enable_contact" boolean not null default true,
    "enable_estimate" boolean not null default true,
    "social_links" jsonb not null default '{"github": "https://github.com/ottomatty", "twitter": null, "linkedin": null}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "last_modified_by" uuid
);


alter table "public"."site_settings" enable row level security;

create table "public"."skill_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "parent_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."skill_categories" enable row level security;

create table "public"."skill_category_relations" (
    "skill_id" uuid not null,
    "category_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."skill_category_relations" enable row level security;

create table "public"."skill_experiences" (
    "id" uuid not null default gen_random_uuid(),
    "skill_id" uuid not null,
    "project_name" text not null,
    "description" text not null,
    "started_at" date not null,
    "ended_at" date,
    "is_current" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."skill_experiences" enable row level security;

create table "public"."skill_features" (
    "id" uuid not null default gen_random_uuid(),
    "skill_id" uuid not null,
    "description" text not null,
    "is_capable" boolean not null default true,
    "priority" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."skill_features" enable row level security;

create table "public"."skills" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "name" text not null,
    "description" text not null,
    "icon_url" text,
    "started_at" date not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."skills" enable row level security;

create table "public"."sync_errors" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "error_message" text not null,
    "created_at" timestamp with time zone default now(),
    "resolved_at" timestamp with time zone
);


alter table "public"."sync_errors" enable row level security;

create table "public"."tasks" (
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid not null,
    "title" character varying(200) not null,
    "description" text,
    "status" character varying(20) not null default 'todo'::character varying,
    "priority" integer default 0,
    "due_date" timestamp with time zone,
    "is_archived" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."tasks" enable row level security;

create table "public"."technologies" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "category" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."technologies" enable row level security;

create table "public"."trusted_devices" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "device_id" text not null,
    "device_name" text not null,
    "device_type" text not null,
    "os_info" text,
    "browser_info" text,
    "last_ip" inet,
    "last_used_at" timestamp with time zone,
    "expires_at" timestamp with time zone not null default timezone('utc'::text, (now() + '30 days'::interval)),
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."trusted_devices" enable row level security;

create table "public"."user_roles" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "role_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."work_challenges" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "title" text not null,
    "description" text not null,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_challenges" enable row level security;

create table "public"."work_details" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "overview" text not null,
    "role" text not null,
    "period" text not null,
    "team_size" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_details" enable row level security;

create table "public"."work_images" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "url" text not null,
    "alt" text not null,
    "caption" text,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_images" enable row level security;

create table "public"."work_responsibilities" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "description" text not null,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_responsibilities" enable row level security;

create table "public"."work_results" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "description" text not null,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_results" enable row level security;

create table "public"."work_skills" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid,
    "skill_id" uuid,
    "description" text not null,
    "highlights" text[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_skills" enable row level security;

create table "public"."work_solutions" (
    "id" uuid not null default gen_random_uuid(),
    "work_id" uuid not null,
    "challenge_id" uuid,
    "title" text not null,
    "description" text not null,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."work_solutions" enable row level security;

create table "public"."work_technologies" (
    "work_id" uuid not null,
    "technology_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."work_technologies" enable row level security;

create table "public"."works" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "description" text not null,
    "thumbnail_url" text not null,
    "category" text not null,
    "github_url" text,
    "website_url" text,
    "status" text not null default 'draft'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."works" enable row level security;

CREATE UNIQUE INDEX admin_users_history_pkey ON public.admin_users_history USING btree (id);

CREATE UNIQUE INDEX admin_users_pkey ON public.admin_users USING btree (id);

CREATE UNIQUE INDEX audit_logs_pkey ON public.audit_logs USING btree (id);

CREATE INDEX blog_categories_name_idx ON public.blog_categories USING btree (name);

CREATE UNIQUE INDEX blog_categories_name_key ON public.blog_categories USING btree (name);

CREATE UNIQUE INDEX blog_categories_pkey ON public.blog_categories USING btree (id);

CREATE INDEX blog_posts_categories_category_id_idx ON public.blog_posts_categories USING btree (category_id);

CREATE UNIQUE INDEX blog_posts_categories_pkey ON public.blog_posts_categories USING btree (post_id, category_id);

CREATE INDEX blog_posts_categories_post_id_idx ON public.blog_posts_categories USING btree (post_id);

CREATE UNIQUE INDEX blog_posts_pkey ON public.blog_posts USING btree (id);

CREATE INDEX blog_posts_published_at_idx ON public.blog_posts USING btree (published_at);

CREATE INDEX blog_posts_slug_idx ON public.blog_posts USING btree (slug);

CREATE UNIQUE INDEX blog_posts_slug_key ON public.blog_posts USING btree (slug);

CREATE INDEX blog_posts_status_published_at_idx ON public.blog_posts USING btree (status, published_at);

CREATE UNIQUE INDEX categories_name_key ON public.contact_categories USING btree (name);

CREATE UNIQUE INDEX categories_pkey ON public.contact_categories USING btree (id);

CREATE INDEX chat_messages_chat_id_idx ON public.contact_chat_messages USING btree (chat_id);

CREATE INDEX chat_messages_faq_id_idx ON public.contact_chat_messages USING btree (faq_id);

CREATE UNIQUE INDEX chat_messages_pkey ON public.contact_chat_messages USING btree (id);

CREATE INDEX chats_category_id_idx ON public.contact_chats USING btree (category_id);

CREATE UNIQUE INDEX chats_pkey ON public.contact_chats USING btree (id);

CREATE INDEX chats_profile_id_idx ON public.contact_chats USING btree (profile_id);

CREATE UNIQUE INDEX email_attachments_email_id_file_name_key ON public.email_attachments USING btree (email_id, file_name);

CREATE INDEX email_attachments_email_id_idx ON public.email_attachments USING btree (email_id);

CREATE UNIQUE INDEX email_attachments_pkey ON public.email_attachments USING btree (id);

CREATE INDEX email_replies_gmail_message_id_idx ON public.email_replies USING btree (gmail_message_id);

CREATE INDEX email_replies_original_email_id_idx ON public.email_replies USING btree (original_email_id);

CREATE UNIQUE INDEX email_replies_pkey ON public.email_replies USING btree (id);

CREATE INDEX email_replies_sent_at_idx ON public.email_replies USING btree (sent_at);

CREATE UNIQUE INDEX email_settings_pkey ON public.email_settings USING btree (id);

CREATE INDEX emails_gmail_message_id_idx ON public.emails USING btree (gmail_message_id);

CREATE UNIQUE INDEX emails_gmail_message_id_key ON public.emails USING btree (gmail_message_id);

CREATE UNIQUE INDEX emails_pkey ON public.emails USING btree (id);

CREATE INDEX emails_received_at_idx ON public.emails USING btree (received_at);

CREATE INDEX emails_thread_id_idx ON public.emails USING btree (thread_id);

CREATE INDEX estimate_features_category_idx ON public.estimate_features USING btree (category);

CREATE INDEX estimate_features_estimate_id_idx ON public.estimate_features USING btree (estimate_id);

CREATE INDEX estimate_features_is_required_idx ON public.estimate_features USING btree (is_required);

CREATE UNIQUE INDEX estimate_features_pkey ON public.estimate_features USING btree (id);

CREATE INDEX estimate_requirements_estimate_id_idx ON public.estimate_requirements USING btree (estimate_id);

CREATE UNIQUE INDEX estimate_requirements_pkey ON public.estimate_requirements USING btree (id);

CREATE INDEX estimates_contact_id_idx ON public.estimates USING btree (contact_id);

CREATE INDEX estimates_created_at_idx ON public.estimates USING btree (created_at);

CREATE UNIQUE INDEX estimates_pkey ON public.estimates USING btree (id);

CREATE INDEX estimates_project_type_status_idx ON public.estimates USING btree (project_type, status);

CREATE INDEX faqs_category_id_idx ON public.faqs USING btree (category_id);

CREATE UNIQUE INDEX faqs_pkey ON public.faqs USING btree (id);

CREATE INDEX files_message_id_idx ON public.files USING btree (message_id);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

CREATE UNIQUE INDEX focus_intervals_pkey ON public.focus_intervals USING btree (id);

CREATE UNIQUE INDEX focus_sessions_pkey ON public.focus_sessions USING btree (id);

CREATE UNIQUE INDEX github_contributions_pkey ON public.github_contributions USING btree (id);

CREATE UNIQUE INDEX github_contributions_user_id_contribution_date_key ON public.github_contributions USING btree (user_id, contribution_date);

CREATE UNIQUE INDEX github_settings_pkey ON public.github_settings USING btree (id);

CREATE UNIQUE INDEX github_settings_user_id_key ON public.github_settings USING btree (user_id);

CREATE INDEX gmail_credentials_expiry_date_idx ON public.gmail_credentials USING btree (expiry_date);

CREATE UNIQUE INDEX gmail_credentials_pkey ON public.gmail_credentials USING btree (id);

CREATE INDEX idx_audit_logs_action ON public.audit_logs USING btree (action);

CREATE INDEX idx_audit_logs_created_at ON public.audit_logs USING btree (created_at);

CREATE INDEX idx_audit_logs_entity_type_id ON public.audit_logs USING btree (entity_type, entity_id);

CREATE INDEX idx_audit_logs_user_id ON public.audit_logs USING btree (user_id);

CREATE INDEX idx_github_contributions_user_date ON public.github_contributions USING btree (user_id, contribution_date);

CREATE INDEX idx_otp_challenges_challenge_code ON public.otp_challenges USING btree (challenge_code);

CREATE INDEX idx_otp_challenges_expires_at ON public.otp_challenges USING btree (expires_at);

CREATE INDEX idx_otp_challenges_user_id ON public.otp_challenges USING btree (user_id);

CREATE INDEX idx_otp_settings_is_enabled ON public.otp_settings USING btree (is_enabled);

CREATE INDEX idx_otp_settings_user_id ON public.otp_settings USING btree (user_id);

CREATE INDEX idx_permissions_name ON public.permissions USING btree (name);

CREATE INDEX idx_profiles_email ON public.profiles USING btree (email);

CREATE INDEX idx_profiles_is_active ON public.profiles USING btree (is_active);

CREATE INDEX idx_project_milestones_project_id ON public.project_milestones USING btree (project_id);

CREATE INDEX idx_project_milestones_status ON public.project_milestones USING btree (status);

CREATE INDEX idx_project_progress_logs_milestone_id ON public.project_progress_logs USING btree (milestone_id);

CREATE INDEX idx_project_progress_logs_project_id ON public.project_progress_logs USING btree (project_id);

CREATE INDEX idx_project_progress_logs_task_id ON public.project_progress_logs USING btree (task_id);

CREATE INDEX idx_role_audit_logs_performed_at ON public.role_audit_logs USING btree (performed_at);

CREATE INDEX idx_role_audit_logs_performed_by ON public.role_audit_logs USING btree (performed_by);

CREATE INDEX idx_role_audit_logs_user_id ON public.role_audit_logs USING btree (user_id);

CREATE INDEX idx_role_permissions_permission_id ON public.role_permissions USING btree (permission_id);

CREATE INDEX idx_role_permissions_role_id ON public.role_permissions USING btree (role_id);

CREATE INDEX idx_role_policies_priority ON public.role_policies USING btree (priority);

CREATE INDEX idx_role_policies_resource_action ON public.role_policies USING btree (resource_type, action);

CREATE INDEX idx_role_policies_role_id ON public.role_policies USING btree (role_id);

CREATE INDEX idx_roles_name ON public.roles USING btree (name);

CREATE INDEX idx_session_policies_role_id ON public.session_policies USING btree (role_id);

CREATE INDEX idx_trusted_devices_device_id ON public.trusted_devices USING btree (device_id);

CREATE INDEX idx_trusted_devices_expires_at ON public.trusted_devices USING btree (expires_at);

CREATE INDEX idx_trusted_devices_is_active ON public.trusted_devices USING btree (is_active);

CREATE INDEX idx_trusted_devices_user_id ON public.trusted_devices USING btree (user_id);

CREATE INDEX idx_user_roles_role_id ON public.user_roles USING btree (role_id);

CREATE INDEX idx_user_roles_user_id ON public.user_roles USING btree (user_id);

CREATE INDEX knowledge_page_collaborators_page_id_idx ON public.knowledge_page_collaborators USING btree (page_id);

CREATE UNIQUE INDEX knowledge_page_collaborators_page_id_user_id_key ON public.knowledge_page_collaborators USING btree (page_id, user_id);

CREATE UNIQUE INDEX knowledge_page_collaborators_pkey ON public.knowledge_page_collaborators USING btree (id);

CREATE INDEX knowledge_page_collaborators_user_id_idx ON public.knowledge_page_collaborators USING btree (user_id);

CREATE INDEX knowledge_page_details_page_id_idx ON public.knowledge_page_details USING btree (page_id);

CREATE UNIQUE INDEX knowledge_page_details_page_id_key ON public.knowledge_page_details USING btree (page_id);

CREATE UNIQUE INDEX knowledge_page_details_pkey ON public.knowledge_page_details USING btree (id);

CREATE UNIQUE INDEX knowledge_page_links_pkey ON public.knowledge_page_links USING btree (id);

CREATE INDEX knowledge_page_links_source_page_id_idx ON public.knowledge_page_links USING btree (source_page_id);

CREATE UNIQUE INDEX knowledge_page_links_source_target_key ON public.knowledge_page_links USING btree (source_page_id, target_page_id);

CREATE INDEX knowledge_page_links_target_page_id_idx ON public.knowledge_page_links USING btree (target_page_id);

CREATE UNIQUE INDEX knowledge_pages_pkey ON public.knowledge_pages USING btree (id);

CREATE INDEX knowledge_pages_project_id_idx ON public.knowledge_pages USING btree (project_id);

CREATE UNIQUE INDEX knowledge_pages_project_id_scrapbox_id_key ON public.knowledge_pages USING btree (project_id, scrapbox_id);

CREATE INDEX knowledge_pages_title_idx ON public.knowledge_pages USING btree (title);

CREATE INDEX knowledge_pages_updated_at_idx ON public.knowledge_pages USING btree (updated_at);

CREATE UNIQUE INDEX knowledge_projects_pkey ON public.knowledge_projects USING btree (id);

CREATE INDEX knowledge_projects_project_name_idx ON public.knowledge_projects USING btree (project_name);

CREATE UNIQUE INDEX knowledge_projects_project_name_key ON public.knowledge_projects USING btree (project_name);

CREATE UNIQUE INDEX knowledge_sync_logs_pkey ON public.knowledge_sync_logs USING btree (id);

CREATE INDEX knowledge_sync_logs_project_id_idx ON public.knowledge_sync_logs USING btree (project_id);

CREATE INDEX knowledge_sync_logs_sync_started_at_idx ON public.knowledge_sync_logs USING btree (sync_started_at);

CREATE UNIQUE INDEX knowledge_users_pkey ON public.knowledge_users USING btree (id);

CREATE INDEX knowledge_users_scrapbox_id_idx ON public.knowledge_users USING btree (scrapbox_id);

CREATE UNIQUE INDEX knowledge_users_scrapbox_id_key ON public.knowledge_users USING btree (scrapbox_id);

CREATE UNIQUE INDEX metrics_pkey ON public.metrics USING btree (id);

CREATE UNIQUE INDEX metrics_type_key ON public.metrics USING btree (type);

CREATE UNIQUE INDEX notification_settings_pkey ON public.notification_settings USING btree (id);

CREATE UNIQUE INDEX notification_settings_user_id_idx ON public.notification_settings USING btree (user_id);

CREATE UNIQUE INDEX notification_settings_user_id_key ON public.notification_settings USING btree (user_id);

CREATE INDEX notifications_created_at_idx ON public.notifications USING btree (created_at);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE INDEX notifications_user_id_idx ON public.notifications USING btree (user_id);

CREATE UNIQUE INDEX otp_challenges_pkey ON public.otp_challenges USING btree (id);

CREATE UNIQUE INDEX otp_settings_pkey ON public.otp_settings USING btree (id);

CREATE UNIQUE INDEX otp_settings_user_id_key ON public.otp_settings USING btree (user_id);

CREATE UNIQUE INDEX permissions_name_key ON public.permissions USING btree (name);

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX project_github_integrations_pkey ON public.project_github_integrations USING btree (id);

CREATE UNIQUE INDEX project_github_integrations_project_id_key ON public.project_github_integrations USING btree (project_id);

CREATE UNIQUE INDEX project_milestones_pkey ON public.project_milestones USING btree (id);

CREATE UNIQUE INDEX project_progress_logs_pkey ON public.project_progress_logs USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX role_audit_logs_pkey ON public.role_audit_logs USING btree (id);

CREATE UNIQUE INDEX role_permissions_pkey ON public.role_permissions USING btree (id);

CREATE UNIQUE INDEX role_permissions_role_id_permission_id_key ON public.role_permissions USING btree (role_id, permission_id);

CREATE UNIQUE INDEX role_policies_pkey ON public.role_policies USING btree (id);

CREATE UNIQUE INDEX role_policies_role_id_resource_type_action_key ON public.role_policies USING btree (role_id, resource_type, action);

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX session_policies_pkey ON public.session_policies USING btree (id);

CREATE UNIQUE INDEX session_policies_role_id_key ON public.session_policies USING btree (role_id);

CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (id);

CREATE UNIQUE INDEX skill_categories_name_key ON public.skill_categories USING btree (name);

CREATE INDEX skill_categories_parent_id_idx ON public.skill_categories USING btree (parent_id);

CREATE UNIQUE INDEX skill_categories_pkey ON public.skill_categories USING btree (id);

CREATE INDEX skill_category_relations_category_id_idx ON public.skill_category_relations USING btree (category_id);

CREATE UNIQUE INDEX skill_category_relations_pkey ON public.skill_category_relations USING btree (skill_id, category_id);

CREATE INDEX skill_category_relations_skill_id_idx ON public.skill_category_relations USING btree (skill_id);

CREATE UNIQUE INDEX skill_experiences_pkey ON public.skill_experiences USING btree (id);

CREATE INDEX skill_experiences_skill_id_idx ON public.skill_experiences USING btree (skill_id);

CREATE INDEX skill_experiences_started_at_idx ON public.skill_experiences USING btree (started_at);

CREATE INDEX skill_features_is_capable_priority_idx ON public.skill_features USING btree (is_capable, priority DESC);

CREATE UNIQUE INDEX skill_features_pkey ON public.skill_features USING btree (id);

CREATE INDEX skill_features_skill_id_idx ON public.skill_features USING btree (skill_id);

CREATE UNIQUE INDEX skills_pkey ON public.skills USING btree (id);

CREATE INDEX skills_slug_idx ON public.skills USING btree (slug);

CREATE UNIQUE INDEX skills_slug_key ON public.skills USING btree (slug);

CREATE INDEX sync_errors_created_at_idx ON public.sync_errors USING btree (created_at);

CREATE UNIQUE INDEX sync_errors_pkey ON public.sync_errors USING btree (id);

CREATE INDEX sync_errors_user_id_idx ON public.sync_errors USING btree (user_id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE INDEX technologies_category_idx ON public.technologies USING btree (category);

CREATE INDEX technologies_name_idx ON public.technologies USING btree (name);

CREATE UNIQUE INDEX technologies_name_key ON public.technologies USING btree (name);

CREATE UNIQUE INDEX technologies_pkey ON public.technologies USING btree (id);

CREATE UNIQUE INDEX trusted_devices_pkey ON public.trusted_devices USING btree (id);

CREATE UNIQUE INDEX trusted_devices_user_id_device_id_key ON public.trusted_devices USING btree (user_id, device_id);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (id);

CREATE UNIQUE INDEX user_roles_user_id_role_id_key ON public.user_roles USING btree (user_id, role_id);

CREATE UNIQUE INDEX work_challenges_pkey ON public.work_challenges USING btree (id);

CREATE INDEX work_challenges_work_id_sort_order_idx ON public.work_challenges USING btree (work_id, sort_order);

CREATE UNIQUE INDEX work_details_pkey ON public.work_details USING btree (id);

CREATE INDEX work_details_work_id_idx ON public.work_details USING btree (work_id);

CREATE UNIQUE INDEX work_images_pkey ON public.work_images USING btree (id);

CREATE INDEX work_images_work_id_sort_order_idx ON public.work_images USING btree (work_id, sort_order);

CREATE UNIQUE INDEX work_responsibilities_pkey ON public.work_responsibilities USING btree (id);

CREATE INDEX work_responsibilities_work_id_sort_order_idx ON public.work_responsibilities USING btree (work_id, sort_order);

CREATE UNIQUE INDEX work_results_pkey ON public.work_results USING btree (id);

CREATE INDEX work_results_work_id_sort_order_idx ON public.work_results USING btree (work_id, sort_order);

CREATE UNIQUE INDEX work_skills_pkey ON public.work_skills USING btree (id);

CREATE INDEX work_skills_skill_id_idx ON public.work_skills USING btree (skill_id);

CREATE INDEX work_skills_work_id_idx ON public.work_skills USING btree (work_id);

CREATE UNIQUE INDEX work_skills_work_id_skill_id_key ON public.work_skills USING btree (work_id, skill_id);

CREATE INDEX work_solutions_challenge_id_idx ON public.work_solutions USING btree (challenge_id);

CREATE UNIQUE INDEX work_solutions_pkey ON public.work_solutions USING btree (id);

CREATE INDEX work_solutions_work_id_sort_order_idx ON public.work_solutions USING btree (work_id, sort_order);

CREATE UNIQUE INDEX work_technologies_pkey ON public.work_technologies USING btree (work_id, technology_id);

CREATE INDEX work_technologies_technology_id_idx ON public.work_technologies USING btree (technology_id);

CREATE INDEX work_technologies_work_id_idx ON public.work_technologies USING btree (work_id);

CREATE INDEX works_category_idx ON public.works USING btree (category);

CREATE UNIQUE INDEX works_pkey ON public.works USING btree (id);

CREATE INDEX works_slug_idx ON public.works USING btree (slug);

CREATE UNIQUE INDEX works_slug_key ON public.works USING btree (slug);

CREATE INDEX works_status_created_at_idx ON public.works USING btree (status, created_at);

alter table "public"."admin_users" add constraint "admin_users_pkey" PRIMARY KEY using index "admin_users_pkey";

alter table "public"."admin_users_history" add constraint "admin_users_history_pkey" PRIMARY KEY using index "admin_users_history_pkey";

alter table "public"."audit_logs" add constraint "audit_logs_pkey" PRIMARY KEY using index "audit_logs_pkey";

alter table "public"."blog_categories" add constraint "blog_categories_pkey" PRIMARY KEY using index "blog_categories_pkey";

alter table "public"."blog_posts" add constraint "blog_posts_pkey" PRIMARY KEY using index "blog_posts_pkey";

alter table "public"."blog_posts_categories" add constraint "blog_posts_categories_pkey" PRIMARY KEY using index "blog_posts_categories_pkey";

alter table "public"."contact_categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."contact_chat_messages" add constraint "chat_messages_pkey" PRIMARY KEY using index "chat_messages_pkey";

alter table "public"."contact_chats" add constraint "chats_pkey" PRIMARY KEY using index "chats_pkey";

alter table "public"."email_attachments" add constraint "email_attachments_pkey" PRIMARY KEY using index "email_attachments_pkey";

alter table "public"."email_replies" add constraint "email_replies_pkey" PRIMARY KEY using index "email_replies_pkey";

alter table "public"."email_settings" add constraint "email_settings_pkey" PRIMARY KEY using index "email_settings_pkey";

alter table "public"."emails" add constraint "emails_pkey" PRIMARY KEY using index "emails_pkey";

alter table "public"."estimate_features" add constraint "estimate_features_pkey" PRIMARY KEY using index "estimate_features_pkey";

alter table "public"."estimate_requirements" add constraint "estimate_requirements_pkey" PRIMARY KEY using index "estimate_requirements_pkey";

alter table "public"."estimates" add constraint "estimates_pkey" PRIMARY KEY using index "estimates_pkey";

alter table "public"."faqs" add constraint "faqs_pkey" PRIMARY KEY using index "faqs_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."focus_intervals" add constraint "focus_intervals_pkey" PRIMARY KEY using index "focus_intervals_pkey";

alter table "public"."focus_sessions" add constraint "focus_sessions_pkey" PRIMARY KEY using index "focus_sessions_pkey";

alter table "public"."github_contributions" add constraint "github_contributions_pkey" PRIMARY KEY using index "github_contributions_pkey";

alter table "public"."github_settings" add constraint "github_settings_pkey" PRIMARY KEY using index "github_settings_pkey";

alter table "public"."gmail_credentials" add constraint "gmail_credentials_pkey" PRIMARY KEY using index "gmail_credentials_pkey";

alter table "public"."knowledge_page_collaborators" add constraint "knowledge_page_collaborators_pkey" PRIMARY KEY using index "knowledge_page_collaborators_pkey";

alter table "public"."knowledge_page_details" add constraint "knowledge_page_details_pkey" PRIMARY KEY using index "knowledge_page_details_pkey";

alter table "public"."knowledge_page_links" add constraint "knowledge_page_links_pkey" PRIMARY KEY using index "knowledge_page_links_pkey";

alter table "public"."knowledge_pages" add constraint "knowledge_pages_pkey" PRIMARY KEY using index "knowledge_pages_pkey";

alter table "public"."knowledge_projects" add constraint "knowledge_projects_pkey" PRIMARY KEY using index "knowledge_projects_pkey";

alter table "public"."knowledge_sync_logs" add constraint "knowledge_sync_logs_pkey" PRIMARY KEY using index "knowledge_sync_logs_pkey";

alter table "public"."knowledge_users" add constraint "knowledge_users_pkey" PRIMARY KEY using index "knowledge_users_pkey";

alter table "public"."metrics" add constraint "metrics_pkey" PRIMARY KEY using index "metrics_pkey";

alter table "public"."notification_settings" add constraint "notification_settings_pkey" PRIMARY KEY using index "notification_settings_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."otp_challenges" add constraint "otp_challenges_pkey" PRIMARY KEY using index "otp_challenges_pkey";

alter table "public"."otp_settings" add constraint "otp_settings_pkey" PRIMARY KEY using index "otp_settings_pkey";

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."project_github_integrations" add constraint "project_github_integrations_pkey" PRIMARY KEY using index "project_github_integrations_pkey";

alter table "public"."project_milestones" add constraint "project_milestones_pkey" PRIMARY KEY using index "project_milestones_pkey";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_pkey" PRIMARY KEY using index "project_progress_logs_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."role_audit_logs" add constraint "role_audit_logs_pkey" PRIMARY KEY using index "role_audit_logs_pkey";

alter table "public"."role_permissions" add constraint "role_permissions_pkey" PRIMARY KEY using index "role_permissions_pkey";

alter table "public"."role_policies" add constraint "role_policies_pkey" PRIMARY KEY using index "role_policies_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."session_policies" add constraint "session_policies_pkey" PRIMARY KEY using index "session_policies_pkey";

alter table "public"."site_settings" add constraint "site_settings_pkey" PRIMARY KEY using index "site_settings_pkey";

alter table "public"."skill_categories" add constraint "skill_categories_pkey" PRIMARY KEY using index "skill_categories_pkey";

alter table "public"."skill_category_relations" add constraint "skill_category_relations_pkey" PRIMARY KEY using index "skill_category_relations_pkey";

alter table "public"."skill_experiences" add constraint "skill_experiences_pkey" PRIMARY KEY using index "skill_experiences_pkey";

alter table "public"."skill_features" add constraint "skill_features_pkey" PRIMARY KEY using index "skill_features_pkey";

alter table "public"."skills" add constraint "skills_pkey" PRIMARY KEY using index "skills_pkey";

alter table "public"."sync_errors" add constraint "sync_errors_pkey" PRIMARY KEY using index "sync_errors_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."technologies" add constraint "technologies_pkey" PRIMARY KEY using index "technologies_pkey";

alter table "public"."trusted_devices" add constraint "trusted_devices_pkey" PRIMARY KEY using index "trusted_devices_pkey";

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."work_challenges" add constraint "work_challenges_pkey" PRIMARY KEY using index "work_challenges_pkey";

alter table "public"."work_details" add constraint "work_details_pkey" PRIMARY KEY using index "work_details_pkey";

alter table "public"."work_images" add constraint "work_images_pkey" PRIMARY KEY using index "work_images_pkey";

alter table "public"."work_responsibilities" add constraint "work_responsibilities_pkey" PRIMARY KEY using index "work_responsibilities_pkey";

alter table "public"."work_results" add constraint "work_results_pkey" PRIMARY KEY using index "work_results_pkey";

alter table "public"."work_skills" add constraint "work_skills_pkey" PRIMARY KEY using index "work_skills_pkey";

alter table "public"."work_solutions" add constraint "work_solutions_pkey" PRIMARY KEY using index "work_solutions_pkey";

alter table "public"."work_technologies" add constraint "work_technologies_pkey" PRIMARY KEY using index "work_technologies_pkey";

alter table "public"."works" add constraint "works_pkey" PRIMARY KEY using index "works_pkey";

alter table "public"."admin_users" add constraint "admin_users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users" validate constraint "admin_users_id_fkey";

alter table "public"."admin_users_history" add constraint "admin_users_history_performed_by_fkey" FOREIGN KEY (performed_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users_history" validate constraint "admin_users_history_performed_by_fkey";

alter table "public"."admin_users_history" add constraint "admin_users_history_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users_history" validate constraint "admin_users_history_user_id_fkey";

alter table "public"."audit_logs" add constraint "audit_logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."audit_logs" validate constraint "audit_logs_user_id_fkey";

alter table "public"."blog_categories" add constraint "blog_categories_name_key" UNIQUE using index "blog_categories_name_key";

alter table "public"."blog_posts" add constraint "blog_posts_slug_key" UNIQUE using index "blog_posts_slug_key";

alter table "public"."blog_posts" add constraint "blog_posts_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text]))) not valid;

alter table "public"."blog_posts" validate constraint "blog_posts_status_check";

alter table "public"."blog_posts_categories" add constraint "blog_posts_categories_category_id_fkey" FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE not valid;

alter table "public"."blog_posts_categories" validate constraint "blog_posts_categories_category_id_fkey";

alter table "public"."blog_posts_categories" add constraint "blog_posts_categories_post_id_fkey" FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE not valid;

alter table "public"."blog_posts_categories" validate constraint "blog_posts_categories_post_id_fkey";

alter table "public"."contact_categories" add constraint "categories_name_key" UNIQUE using index "categories_name_key";

alter table "public"."contact_chat_messages" add constraint "chat_messages_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES contact_chats(id) not valid;

alter table "public"."contact_chat_messages" validate constraint "chat_messages_chat_id_fkey";

alter table "public"."contact_chat_messages" add constraint "chat_messages_faq_id_fkey" FOREIGN KEY (faq_id) REFERENCES faqs(id) not valid;

alter table "public"."contact_chat_messages" validate constraint "chat_messages_faq_id_fkey";

alter table "public"."contact_chat_messages" add constraint "chat_messages_sender_type_check" CHECK (((sender_type)::text = ANY ((ARRAY['user'::character varying, 'assistant'::character varying, 'admin'::character varying])::text[]))) not valid;

alter table "public"."contact_chat_messages" validate constraint "chat_messages_sender_type_check";

alter table "public"."contact_chats" add constraint "chats_category_id_fkey" FOREIGN KEY (category_id) REFERENCES contact_categories(id) not valid;

alter table "public"."contact_chats" validate constraint "chats_category_id_fkey";

alter table "public"."contact_chats" add constraint "chats_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."contact_chats" validate constraint "chats_profile_id_fkey";

alter table "public"."contact_chats" add constraint "chats_status_check" CHECK (((status)::text = ANY ((ARRAY['open'::character varying, 'pending'::character varying, 'escalated'::character varying, 'closed'::character varying])::text[]))) not valid;

alter table "public"."contact_chats" validate constraint "chats_status_check";

alter table "public"."email_attachments" add constraint "email_attachments_email_id_file_name_key" UNIQUE using index "email_attachments_email_id_file_name_key";

alter table "public"."email_attachments" add constraint "email_attachments_email_id_fkey" FOREIGN KEY (email_id) REFERENCES emails(id) not valid;

alter table "public"."email_attachments" validate constraint "email_attachments_email_id_fkey";

alter table "public"."email_replies" add constraint "email_replies_original_email_id_fkey" FOREIGN KEY (original_email_id) REFERENCES emails(id) ON DELETE SET NULL not valid;

alter table "public"."email_replies" validate constraint "email_replies_original_email_id_fkey";

alter table "public"."emails" add constraint "emails_gmail_message_id_key" UNIQUE using index "emails_gmail_message_id_key";

alter table "public"."estimate_features" add constraint "estimate_features_category_check" CHECK ((category = ANY (ARRAY['core'::text, 'user'::text, 'auth'::text, 'content'::text, 'payment'::text, 'other'::text]))) not valid;

alter table "public"."estimate_features" validate constraint "estimate_features_category_check";

alter table "public"."estimate_features" add constraint "estimate_features_estimate_id_fkey" FOREIGN KEY (estimate_id) REFERENCES estimates(id) ON DELETE CASCADE not valid;

alter table "public"."estimate_features" validate constraint "estimate_features_estimate_id_fkey";

alter table "public"."estimate_requirements" add constraint "estimate_requirements_design_format_check" CHECK ((design_format = ANY (ARRAY['figma'::text, 'xd'::text, 'photoshop'::text, 'sketch'::text, 'other'::text]))) not valid;

alter table "public"."estimate_requirements" validate constraint "estimate_requirements_design_format_check";

alter table "public"."estimate_requirements" add constraint "estimate_requirements_estimate_id_fkey" FOREIGN KEY (estimate_id) REFERENCES estimates(id) ON DELETE CASCADE not valid;

alter table "public"."estimate_requirements" validate constraint "estimate_requirements_estimate_id_fkey";

alter table "public"."estimates" add constraint "estimates_deadline_check" CHECK ((deadline = ANY (ARRAY['asap'::text, '1month'::text, '3months'::text, '6months'::text, 'flexible'::text]))) not valid;

alter table "public"."estimates" validate constraint "estimates_deadline_check";

alter table "public"."estimates" add constraint "estimates_project_type_check" CHECK ((project_type = ANY (ARRAY['web'::text, 'app'::text, 'other'::text]))) not valid;

alter table "public"."estimates" validate constraint "estimates_project_type_check";

alter table "public"."estimates" add constraint "estimates_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'sent'::text, 'accepted'::text, 'rejected'::text]))) not valid;

alter table "public"."estimates" validate constraint "estimates_status_check";

alter table "public"."faqs" add constraint "faqs_category_id_fkey" FOREIGN KEY (category_id) REFERENCES contact_categories(id) not valid;

alter table "public"."faqs" validate constraint "faqs_category_id_fkey";

alter table "public"."files" add constraint "files_message_id_fkey" FOREIGN KEY (message_id) REFERENCES contact_chat_messages(id) not valid;

alter table "public"."files" validate constraint "files_message_id_fkey";

alter table "public"."focus_intervals" add constraint "focus_intervals_session_id_fkey" FOREIGN KEY (session_id) REFERENCES focus_sessions(id) not valid;

alter table "public"."focus_intervals" validate constraint "focus_intervals_session_id_fkey";

alter table "public"."focus_sessions" add constraint "focus_sessions_focus_score_check" CHECK (((focus_score >= 1) AND (focus_score <= 5))) not valid;

alter table "public"."focus_sessions" validate constraint "focus_sessions_focus_score_check";

alter table "public"."focus_sessions" add constraint "focus_sessions_knowledge_page_id_fkey" FOREIGN KEY (knowledge_page_id) REFERENCES knowledge_pages(id) not valid;

alter table "public"."focus_sessions" validate constraint "focus_sessions_knowledge_page_id_fkey";

alter table "public"."focus_sessions" add constraint "focus_sessions_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."focus_sessions" validate constraint "focus_sessions_project_id_fkey";

alter table "public"."focus_sessions" add constraint "focus_sessions_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) not valid;

alter table "public"."focus_sessions" validate constraint "focus_sessions_task_id_fkey";

alter table "public"."focus_sessions" add constraint "focus_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."focus_sessions" validate constraint "focus_sessions_user_id_fkey";

alter table "public"."github_contributions" add constraint "github_contributions_user_id_contribution_date_key" UNIQUE using index "github_contributions_user_id_contribution_date_key";

alter table "public"."github_contributions" add constraint "github_contributions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."github_contributions" validate constraint "github_contributions_user_id_fkey";

alter table "public"."github_settings" add constraint "github_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."github_settings" validate constraint "github_settings_user_id_fkey";

alter table "public"."github_settings" add constraint "github_settings_user_id_key" UNIQUE using index "github_settings_user_id_key";

alter table "public"."knowledge_page_collaborators" add constraint "knowledge_page_collaborators_page_id_fkey" FOREIGN KEY (page_id) REFERENCES knowledge_pages(id) not valid;

alter table "public"."knowledge_page_collaborators" validate constraint "knowledge_page_collaborators_page_id_fkey";

alter table "public"."knowledge_page_collaborators" add constraint "knowledge_page_collaborators_page_id_user_id_key" UNIQUE using index "knowledge_page_collaborators_page_id_user_id_key";

alter table "public"."knowledge_page_collaborators" add constraint "knowledge_page_collaborators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES knowledge_users(id) not valid;

alter table "public"."knowledge_page_collaborators" validate constraint "knowledge_page_collaborators_user_id_fkey";

alter table "public"."knowledge_page_details" add constraint "knowledge_page_details_page_id_fkey" FOREIGN KEY (page_id) REFERENCES knowledge_pages(id) not valid;

alter table "public"."knowledge_page_details" validate constraint "knowledge_page_details_page_id_fkey";

alter table "public"."knowledge_page_details" add constraint "knowledge_page_details_page_id_key" UNIQUE using index "knowledge_page_details_page_id_key";

alter table "public"."knowledge_page_links" add constraint "knowledge_page_links_source_page_id_fkey" FOREIGN KEY (source_page_id) REFERENCES knowledge_pages(id) not valid;

alter table "public"."knowledge_page_links" validate constraint "knowledge_page_links_source_page_id_fkey";

alter table "public"."knowledge_page_links" add constraint "knowledge_page_links_source_target_key" UNIQUE using index "knowledge_page_links_source_target_key";

alter table "public"."knowledge_page_links" add constraint "knowledge_page_links_target_page_id_fkey" FOREIGN KEY (target_page_id) REFERENCES knowledge_pages(id) not valid;

alter table "public"."knowledge_page_links" validate constraint "knowledge_page_links_target_page_id_fkey";

alter table "public"."knowledge_pages" add constraint "knowledge_pages_project_id_fkey" FOREIGN KEY (project_id) REFERENCES knowledge_projects(id) not valid;

alter table "public"."knowledge_pages" validate constraint "knowledge_pages_project_id_fkey";

alter table "public"."knowledge_pages" add constraint "knowledge_pages_project_id_scrapbox_id_key" UNIQUE using index "knowledge_pages_project_id_scrapbox_id_key";

alter table "public"."knowledge_projects" add constraint "knowledge_projects_project_name_key" UNIQUE using index "knowledge_projects_project_name_key";

alter table "public"."knowledge_sync_logs" add constraint "knowledge_sync_logs_project_id_fkey" FOREIGN KEY (project_id) REFERENCES knowledge_projects(id) not valid;

alter table "public"."knowledge_sync_logs" validate constraint "knowledge_sync_logs_project_id_fkey";

alter table "public"."knowledge_users" add constraint "knowledge_users_scrapbox_id_key" UNIQUE using index "knowledge_users_scrapbox_id_key";

alter table "public"."metrics" add constraint "metrics_type_key" UNIQUE using index "metrics_type_key";

alter table "public"."notification_settings" add constraint "notification_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notification_settings" validate constraint "notification_settings_user_id_fkey";

alter table "public"."notification_settings" add constraint "notification_settings_user_id_key" UNIQUE using index "notification_settings_user_id_key";

alter table "public"."notifications" add constraint "notifications_type_check" CHECK ((type = ANY (ARRAY['project_update'::text, 'chat_message'::text, 'milestone'::text, 'document'::text, 'system'::text]))) not valid;

alter table "public"."notifications" validate constraint "notifications_type_check";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."otp_challenges" add constraint "otp_challenges_challenge_type_check" CHECK ((challenge_type = ANY (ARRAY['setup'::text, 'login'::text, 'recovery'::text]))) not valid;

alter table "public"."otp_challenges" validate constraint "otp_challenges_challenge_type_check";

alter table "public"."otp_challenges" add constraint "otp_challenges_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."otp_challenges" validate constraint "otp_challenges_user_id_fkey";

alter table "public"."otp_settings" add constraint "otp_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."otp_settings" validate constraint "otp_settings_user_id_fkey";

alter table "public"."otp_settings" add constraint "otp_settings_user_id_key" UNIQUE using index "otp_settings_user_id_key";

alter table "public"."permissions" add constraint "permissions_name_key" UNIQUE using index "permissions_name_key";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."project_github_integrations" add constraint "project_github_integrations_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."project_github_integrations" validate constraint "project_github_integrations_project_id_fkey";

alter table "public"."project_github_integrations" add constraint "project_github_integrations_project_id_key" UNIQUE using index "project_github_integrations_project_id_key";

alter table "public"."project_milestones" add constraint "project_milestones_progress_check" CHECK (((progress >= 0) AND (progress <= 100))) not valid;

alter table "public"."project_milestones" validate constraint "project_milestones_progress_check";

alter table "public"."project_milestones" add constraint "project_milestones_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."project_milestones" validate constraint "project_milestones_project_id_fkey";

alter table "public"."project_milestones" add constraint "project_milestones_status_check" CHECK ((status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text]))) not valid;

alter table "public"."project_milestones" validate constraint "project_milestones_status_check";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_hours_spent_check" CHECK ((hours_spent > (0)::numeric)) not valid;

alter table "public"."project_progress_logs" validate constraint "project_progress_logs_hours_spent_check";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_log_type_check" CHECK ((log_type = ANY (ARRAY['milestone'::text, 'task'::text, 'general'::text]))) not valid;

alter table "public"."project_progress_logs" validate constraint "project_progress_logs_log_type_check";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_milestone_id_fkey" FOREIGN KEY (milestone_id) REFERENCES project_milestones(id) ON DELETE SET NULL not valid;

alter table "public"."project_progress_logs" validate constraint "project_progress_logs_milestone_id_fkey";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."project_progress_logs" validate constraint "project_progress_logs_project_id_fkey";

alter table "public"."project_progress_logs" add constraint "project_progress_logs_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL not valid;

alter table "public"."project_progress_logs" validate constraint "project_progress_logs_task_id_fkey";

alter table "public"."projects" add constraint "projects_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."projects" validate constraint "projects_user_id_fkey";

alter table "public"."role_audit_logs" add constraint "role_audit_logs_performed_by_fkey" FOREIGN KEY (performed_by) REFERENCES auth.users(id) not valid;

alter table "public"."role_audit_logs" validate constraint "role_audit_logs_performed_by_fkey";

alter table "public"."role_audit_logs" add constraint "role_audit_logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."role_audit_logs" validate constraint "role_audit_logs_user_id_fkey";

alter table "public"."role_audit_logs" add constraint "valid_action" CHECK ((action = ANY (ARRAY['GRANT'::text, 'REVOKE'::text]))) not valid;

alter table "public"."role_audit_logs" validate constraint "valid_action";

alter table "public"."role_permissions" add constraint "role_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_role_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_permission_id_key" UNIQUE using index "role_permissions_role_id_permission_id_key";

alter table "public"."role_policies" add constraint "role_policies_effect_check" CHECK ((effect = ANY (ARRAY['allow'::text, 'deny'::text]))) not valid;

alter table "public"."role_policies" validate constraint "role_policies_effect_check";

alter table "public"."role_policies" add constraint "role_policies_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_policies" validate constraint "role_policies_role_id_fkey";

alter table "public"."role_policies" add constraint "role_policies_role_id_resource_type_action_key" UNIQUE using index "role_policies_role_id_resource_type_action_key";

alter table "public"."roles" add constraint "roles_name_key" UNIQUE using index "roles_name_key";

alter table "public"."roles" add constraint "roles_type_check" CHECK ((type = ANY (ARRAY['system'::text, 'user'::text]))) not valid;

alter table "public"."roles" validate constraint "roles_type_check";

alter table "public"."session_policies" add constraint "session_policies_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."session_policies" validate constraint "session_policies_role_id_fkey";

alter table "public"."session_policies" add constraint "session_policies_role_id_key" UNIQUE using index "session_policies_role_id_key";

alter table "public"."site_settings" add constraint "single_settings" CHECK ((id = '00000000-0000-0000-0000-000000000000'::uuid)) not valid;

alter table "public"."site_settings" validate constraint "single_settings";

alter table "public"."site_settings" add constraint "site_settings_last_modified_by_fkey" FOREIGN KEY (last_modified_by) REFERENCES auth.users(id) not valid;

alter table "public"."site_settings" validate constraint "site_settings_last_modified_by_fkey";

alter table "public"."skill_categories" add constraint "skill_categories_name_key" UNIQUE using index "skill_categories_name_key";

alter table "public"."skill_categories" add constraint "skill_categories_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES skill_categories(id) not valid;

alter table "public"."skill_categories" validate constraint "skill_categories_parent_id_fkey";

alter table "public"."skill_category_relations" add constraint "skill_category_relations_category_id_fkey" FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE CASCADE not valid;

alter table "public"."skill_category_relations" validate constraint "skill_category_relations_category_id_fkey";

alter table "public"."skill_category_relations" add constraint "skill_category_relations_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE not valid;

alter table "public"."skill_category_relations" validate constraint "skill_category_relations_skill_id_fkey";

alter table "public"."skill_experiences" add constraint "skill_experiences_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE not valid;

alter table "public"."skill_experiences" validate constraint "skill_experiences_skill_id_fkey";

alter table "public"."skill_features" add constraint "skill_features_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE not valid;

alter table "public"."skill_features" validate constraint "skill_features_skill_id_fkey";

alter table "public"."skills" add constraint "skills_slug_key" UNIQUE using index "skills_slug_key";

alter table "public"."sync_errors" add constraint "sync_errors_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."sync_errors" validate constraint "sync_errors_user_id_fkey";

alter table "public"."tasks" add constraint "tasks_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."tasks" validate constraint "tasks_project_id_fkey";

alter table "public"."technologies" add constraint "technologies_category_check" CHECK ((category = ANY (ARRAY['frontend'::text, 'backend'::text, 'database'::text, 'infrastructure'::text, 'other'::text]))) not valid;

alter table "public"."technologies" validate constraint "technologies_category_check";

alter table "public"."technologies" add constraint "technologies_name_key" UNIQUE using index "technologies_name_key";

alter table "public"."trusted_devices" add constraint "trusted_devices_user_id_device_id_key" UNIQUE using index "trusted_devices_user_id_device_id_key";

alter table "public"."trusted_devices" add constraint "trusted_devices_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."trusted_devices" validate constraint "trusted_devices_user_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_role_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_role_id_key" UNIQUE using index "user_roles_user_id_role_id_key";

alter table "public"."work_challenges" add constraint "work_challenges_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_challenges" validate constraint "work_challenges_work_id_fkey";

alter table "public"."work_details" add constraint "work_details_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_details" validate constraint "work_details_work_id_fkey";

alter table "public"."work_images" add constraint "work_images_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_images" validate constraint "work_images_work_id_fkey";

alter table "public"."work_responsibilities" add constraint "work_responsibilities_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_responsibilities" validate constraint "work_responsibilities_work_id_fkey";

alter table "public"."work_results" add constraint "work_results_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_results" validate constraint "work_results_work_id_fkey";

alter table "public"."work_skills" add constraint "work_skills_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_skills" validate constraint "work_skills_work_id_fkey";

alter table "public"."work_skills" add constraint "work_skills_work_id_skill_id_key" UNIQUE using index "work_skills_work_id_skill_id_key";

alter table "public"."work_solutions" add constraint "work_solutions_challenge_id_fkey" FOREIGN KEY (challenge_id) REFERENCES work_challenges(id) ON DELETE SET NULL not valid;

alter table "public"."work_solutions" validate constraint "work_solutions_challenge_id_fkey";

alter table "public"."work_solutions" add constraint "work_solutions_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_solutions" validate constraint "work_solutions_work_id_fkey";

alter table "public"."work_technologies" add constraint "work_technologies_technology_id_fkey" FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE not valid;

alter table "public"."work_technologies" validate constraint "work_technologies_technology_id_fkey";

alter table "public"."work_technologies" add constraint "work_technologies_work_id_fkey" FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE not valid;

alter table "public"."work_technologies" validate constraint "work_technologies_work_id_fkey";

alter table "public"."works" add constraint "works_category_check" CHECK ((category = ANY (ARRAY['company'::text, 'freelance'::text, 'personal'::text]))) not valid;

alter table "public"."works" validate constraint "works_category_check";

alter table "public"."works" add constraint "works_slug_key" UNIQUE using index "works_slug_key";

alter table "public"."works" add constraint "works_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text]))) not valid;

alter table "public"."works" validate constraint "works_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_admin_user(target_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    -- 実行者が管理者かチェック
    IF NOT (SELECT check_is_admin()) THEN
        RAISE EXCEPTION '管理者権限がありません';
    END IF;

    -- 管理者として追加
    INSERT INTO admin_users (id)
    VALUES (target_user_id)
    ON CONFLICT (id) DO UPDATE
    SET is_active = true, updated_at = NOW();
END;
$function$
;

create or replace view "public"."admin_users_view" as  SELECT DISTINCT au.id AS user_id
   FROM admin_users au
  WHERE (au.is_active = true);


CREATE OR REPLACE FUNCTION public.calculate_total_cost()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.total_cost = NEW.base_cost + NEW.rush_fee;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_is_admin boolean;
BEGIN
    -- 現在のユーザーIDを取得し、admin_usersテーブルで直接チェック
    SELECT EXISTS (
        SELECT 1
        FROM admin_users
        WHERE id = auth.uid()
        AND is_active = true
    ) INTO v_is_admin;

    RETURN COALESCE(v_is_admin, false);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_is_admin(p_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = p_user_id
    AND r.name = 'admin'
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_admin_users()
 RETURNS TABLE(id uuid, email text, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  -- 呼び出し元が管理者かチェック
  if not exists (select 1 from admin_users where id = auth.uid()) then
    raise exception 'アクセス権限がありません';
  end if;

  return query
    select 
      au.id,
      u.email,
      au.created_at
    from admin_users au
    join auth.users u on au.id = u.id
    order by au.created_at desc;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.notification_settings (user_id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user(p_user_id uuid, p_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  v_default_role_id uuid;
begin
  -- デフォルトロールのIDを取得
  select id into v_default_role_id
  from public.roles
  where name = 'user'
  limit 1;

  -- プロファイルを作成
  insert into public.profiles (id, email, created_at, updated_at)
  values (p_user_id, p_email, now(), now())
  on conflict (id) do update
  set email = excluded.email,
      updated_at = now();

  -- ユーザーロールを作成
  insert into public.user_roles (user_id, role_id, created_at)
  values (p_user_id, v_default_role_id, now())
  on conflict (user_id, role_id) do nothing;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user(p_user_id uuid, p_email text, p_full_name text DEFAULT NULL::text, p_avatar_url text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_default_role_id uuid;
BEGIN
  -- デフォルトロールのIDを取得
  SELECT id INTO v_default_role_id
  FROM public.roles
  WHERE name = 'user'
  LIMIT 1;

  -- プロファイルを作成
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_email,
    p_full_name,
    p_avatar_url,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = now();

  -- ユーザーロールを作成（存在しない場合のみ）
  INSERT INTO public.user_roles (
    user_id,
    role_id,
    created_at
  )
  VALUES (
    p_user_id,
    v_default_role_id,
    now()
  )
  ON CONFLICT (user_id, role_id) DO NOTHING;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.log_admin_user_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  acting_user uuid;
begin
  -- 認証コンテキストがない場合（シード時など）は、対象ユーザーのIDを使用
  acting_user := coalesce(auth.uid(), new.id, old.id);
  
  if (tg_op = 'INSERT') then
    insert into admin_users_history (user_id, action, performed_by)
    values (new.id, 'added', acting_user);
  elsif (tg_op = 'DELETE') then
    insert into admin_users_history (user_id, action, performed_by)
    values (old.id, 'removed', acting_user);
  end if;
  return null;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.log_role_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO role_audit_logs (
      user_id, action, role_name, role_type, performed_by
    )
    SELECT
      NEW.user_id,
      'GRANT',
      r.name,
      r.type,
      auth.uid()
    FROM roles r
    WHERE r.id = NEW.role_id;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO role_audit_logs (
      user_id, action, role_name, role_type, performed_by
    )
    SELECT
      OLD.user_id,
      'REVOKE',
      r.name,
      r.type,
      auth.uid()
    FROM roles r
    WHERE r.id = OLD.role_id;
  END IF;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.remove_admin_user(target_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    -- 実行者が管理者かチェック
    IF NOT (SELECT check_is_admin()) THEN
        RAISE EXCEPTION '管理者権限がありません';
    END IF;

    -- 自分自身は削除できない
    IF target_user_id = auth.uid() THEN
        RAISE EXCEPTION '自分自身を管理者から削除することはできません';
    END IF;

    -- 管理者を非アクティブに設定
    UPDATE admin_users
    SET is_active = false, updated_at = NOW()
    WHERE id = target_user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_published_at_on_publish()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.sync_knowledge_projects()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  project record;
  one_hour_ago timestamptz;
  sync_log_id uuid;
begin
  -- 1時間前の時刻を計算
  one_hour_ago := now() - interval '1 hour';
  
  -- 自動同期が有効で、最後の同期から1時間以上経過したプロジェクトを取得
  for project in
    select id, project_name, scrapbox_cookie, is_private
    from public.knowledge_projects
    where auto_sync_enabled = true
    and (last_synced_at is null or last_synced_at < one_hour_ago)
  loop
    -- 同期ログの作成
    insert into public.knowledge_sync_logs (
      project_id,
      sync_started_at,
      status,
      pages_processed,
      pages_updated
    ) values (
      project.id,
      now(),
      'processing',
      0,
      0
    ) returning id into sync_log_id;

    begin
      -- Supabase Edge Functionで同期処理を実行
      select supabase_edge_function(
        'sync-knowledge-project',
        json_build_object(
          'project_id', project.id,
          'project_name', project.project_name,
          'scrapbox_cookie', coalesce(project.scrapbox_cookie, current_setting('app.settings.default_scrapbox_cookie')),
          'is_private', project.is_private
        )
      );

      -- 同期成功時の更新
      update public.knowledge_projects
      set last_synced_at = now()
      where id = project.id;

      update public.knowledge_sync_logs
      set 
        sync_completed_at = now(),
        status = 'completed'
      where id = sync_log_id;

    exception when others then
      -- エラー発生時の更新
      update public.knowledge_sync_logs
      set 
        sync_completed_at = now(),
        status = 'error',
        error_message = SQLERRM
      where id = sync_log_id;
    end;
  end loop;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_estimate_total_cost()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE estimates
    SET base_cost = (
      SELECT COALESCE(SUM(price), 0)
      FROM estimate_features
      WHERE estimate_id = OLD.estimate_id
    )
    WHERE id = OLD.estimate_id;
  ELSE
    UPDATE estimates
    SET base_cost = (
      SELECT COALESCE(SUM(price), 0)
      FROM estimate_features
      WHERE estimate_id = NEW.estimate_id
    )
    WHERE id = NEW.estimate_id;
  END IF;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_project_last_activity()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.last_activity_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."admin_users" to "anon";

grant insert on table "public"."admin_users" to "anon";

grant references on table "public"."admin_users" to "anon";

grant select on table "public"."admin_users" to "anon";

grant trigger on table "public"."admin_users" to "anon";

grant truncate on table "public"."admin_users" to "anon";

grant update on table "public"."admin_users" to "anon";

grant delete on table "public"."admin_users" to "authenticated";

grant insert on table "public"."admin_users" to "authenticated";

grant references on table "public"."admin_users" to "authenticated";

grant select on table "public"."admin_users" to "authenticated";

grant trigger on table "public"."admin_users" to "authenticated";

grant truncate on table "public"."admin_users" to "authenticated";

grant update on table "public"."admin_users" to "authenticated";

grant delete on table "public"."admin_users" to "service_role";

grant insert on table "public"."admin_users" to "service_role";

grant references on table "public"."admin_users" to "service_role";

grant select on table "public"."admin_users" to "service_role";

grant trigger on table "public"."admin_users" to "service_role";

grant truncate on table "public"."admin_users" to "service_role";

grant update on table "public"."admin_users" to "service_role";

grant delete on table "public"."admin_users_history" to "anon";

grant insert on table "public"."admin_users_history" to "anon";

grant references on table "public"."admin_users_history" to "anon";

grant select on table "public"."admin_users_history" to "anon";

grant trigger on table "public"."admin_users_history" to "anon";

grant truncate on table "public"."admin_users_history" to "anon";

grant update on table "public"."admin_users_history" to "anon";

grant delete on table "public"."admin_users_history" to "authenticated";

grant insert on table "public"."admin_users_history" to "authenticated";

grant references on table "public"."admin_users_history" to "authenticated";

grant select on table "public"."admin_users_history" to "authenticated";

grant trigger on table "public"."admin_users_history" to "authenticated";

grant truncate on table "public"."admin_users_history" to "authenticated";

grant update on table "public"."admin_users_history" to "authenticated";

grant delete on table "public"."admin_users_history" to "service_role";

grant insert on table "public"."admin_users_history" to "service_role";

grant references on table "public"."admin_users_history" to "service_role";

grant select on table "public"."admin_users_history" to "service_role";

grant trigger on table "public"."admin_users_history" to "service_role";

grant truncate on table "public"."admin_users_history" to "service_role";

grant update on table "public"."admin_users_history" to "service_role";

grant delete on table "public"."audit_logs" to "anon";

grant insert on table "public"."audit_logs" to "anon";

grant references on table "public"."audit_logs" to "anon";

grant select on table "public"."audit_logs" to "anon";

grant trigger on table "public"."audit_logs" to "anon";

grant truncate on table "public"."audit_logs" to "anon";

grant update on table "public"."audit_logs" to "anon";

grant delete on table "public"."audit_logs" to "authenticated";

grant insert on table "public"."audit_logs" to "authenticated";

grant references on table "public"."audit_logs" to "authenticated";

grant select on table "public"."audit_logs" to "authenticated";

grant trigger on table "public"."audit_logs" to "authenticated";

grant truncate on table "public"."audit_logs" to "authenticated";

grant update on table "public"."audit_logs" to "authenticated";

grant delete on table "public"."audit_logs" to "service_role";

grant insert on table "public"."audit_logs" to "service_role";

grant references on table "public"."audit_logs" to "service_role";

grant select on table "public"."audit_logs" to "service_role";

grant trigger on table "public"."audit_logs" to "service_role";

grant truncate on table "public"."audit_logs" to "service_role";

grant update on table "public"."audit_logs" to "service_role";

grant delete on table "public"."blog_categories" to "anon";

grant insert on table "public"."blog_categories" to "anon";

grant references on table "public"."blog_categories" to "anon";

grant select on table "public"."blog_categories" to "anon";

grant trigger on table "public"."blog_categories" to "anon";

grant truncate on table "public"."blog_categories" to "anon";

grant update on table "public"."blog_categories" to "anon";

grant delete on table "public"."blog_categories" to "authenticated";

grant insert on table "public"."blog_categories" to "authenticated";

grant references on table "public"."blog_categories" to "authenticated";

grant select on table "public"."blog_categories" to "authenticated";

grant trigger on table "public"."blog_categories" to "authenticated";

grant truncate on table "public"."blog_categories" to "authenticated";

grant update on table "public"."blog_categories" to "authenticated";

grant delete on table "public"."blog_categories" to "service_role";

grant insert on table "public"."blog_categories" to "service_role";

grant references on table "public"."blog_categories" to "service_role";

grant select on table "public"."blog_categories" to "service_role";

grant trigger on table "public"."blog_categories" to "service_role";

grant truncate on table "public"."blog_categories" to "service_role";

grant update on table "public"."blog_categories" to "service_role";

grant delete on table "public"."blog_posts" to "anon";

grant insert on table "public"."blog_posts" to "anon";

grant references on table "public"."blog_posts" to "anon";

grant select on table "public"."blog_posts" to "anon";

grant trigger on table "public"."blog_posts" to "anon";

grant truncate on table "public"."blog_posts" to "anon";

grant update on table "public"."blog_posts" to "anon";

grant delete on table "public"."blog_posts" to "authenticated";

grant insert on table "public"."blog_posts" to "authenticated";

grant references on table "public"."blog_posts" to "authenticated";

grant select on table "public"."blog_posts" to "authenticated";

grant trigger on table "public"."blog_posts" to "authenticated";

grant truncate on table "public"."blog_posts" to "authenticated";

grant update on table "public"."blog_posts" to "authenticated";

grant delete on table "public"."blog_posts" to "service_role";

grant insert on table "public"."blog_posts" to "service_role";

grant references on table "public"."blog_posts" to "service_role";

grant select on table "public"."blog_posts" to "service_role";

grant trigger on table "public"."blog_posts" to "service_role";

grant truncate on table "public"."blog_posts" to "service_role";

grant update on table "public"."blog_posts" to "service_role";

grant delete on table "public"."blog_posts_categories" to "anon";

grant insert on table "public"."blog_posts_categories" to "anon";

grant references on table "public"."blog_posts_categories" to "anon";

grant select on table "public"."blog_posts_categories" to "anon";

grant trigger on table "public"."blog_posts_categories" to "anon";

grant truncate on table "public"."blog_posts_categories" to "anon";

grant update on table "public"."blog_posts_categories" to "anon";

grant delete on table "public"."blog_posts_categories" to "authenticated";

grant insert on table "public"."blog_posts_categories" to "authenticated";

grant references on table "public"."blog_posts_categories" to "authenticated";

grant select on table "public"."blog_posts_categories" to "authenticated";

grant trigger on table "public"."blog_posts_categories" to "authenticated";

grant truncate on table "public"."blog_posts_categories" to "authenticated";

grant update on table "public"."blog_posts_categories" to "authenticated";

grant delete on table "public"."blog_posts_categories" to "service_role";

grant insert on table "public"."blog_posts_categories" to "service_role";

grant references on table "public"."blog_posts_categories" to "service_role";

grant select on table "public"."blog_posts_categories" to "service_role";

grant trigger on table "public"."blog_posts_categories" to "service_role";

grant truncate on table "public"."blog_posts_categories" to "service_role";

grant update on table "public"."blog_posts_categories" to "service_role";

grant delete on table "public"."contact_categories" to "anon";

grant insert on table "public"."contact_categories" to "anon";

grant references on table "public"."contact_categories" to "anon";

grant select on table "public"."contact_categories" to "anon";

grant trigger on table "public"."contact_categories" to "anon";

grant truncate on table "public"."contact_categories" to "anon";

grant update on table "public"."contact_categories" to "anon";

grant delete on table "public"."contact_categories" to "authenticated";

grant insert on table "public"."contact_categories" to "authenticated";

grant references on table "public"."contact_categories" to "authenticated";

grant select on table "public"."contact_categories" to "authenticated";

grant trigger on table "public"."contact_categories" to "authenticated";

grant truncate on table "public"."contact_categories" to "authenticated";

grant update on table "public"."contact_categories" to "authenticated";

grant delete on table "public"."contact_categories" to "service_role";

grant insert on table "public"."contact_categories" to "service_role";

grant references on table "public"."contact_categories" to "service_role";

grant select on table "public"."contact_categories" to "service_role";

grant trigger on table "public"."contact_categories" to "service_role";

grant truncate on table "public"."contact_categories" to "service_role";

grant update on table "public"."contact_categories" to "service_role";

grant delete on table "public"."contact_chat_messages" to "anon";

grant insert on table "public"."contact_chat_messages" to "anon";

grant references on table "public"."contact_chat_messages" to "anon";

grant select on table "public"."contact_chat_messages" to "anon";

grant trigger on table "public"."contact_chat_messages" to "anon";

grant truncate on table "public"."contact_chat_messages" to "anon";

grant update on table "public"."contact_chat_messages" to "anon";

grant delete on table "public"."contact_chat_messages" to "authenticated";

grant insert on table "public"."contact_chat_messages" to "authenticated";

grant references on table "public"."contact_chat_messages" to "authenticated";

grant select on table "public"."contact_chat_messages" to "authenticated";

grant trigger on table "public"."contact_chat_messages" to "authenticated";

grant truncate on table "public"."contact_chat_messages" to "authenticated";

grant update on table "public"."contact_chat_messages" to "authenticated";

grant delete on table "public"."contact_chat_messages" to "service_role";

grant insert on table "public"."contact_chat_messages" to "service_role";

grant references on table "public"."contact_chat_messages" to "service_role";

grant select on table "public"."contact_chat_messages" to "service_role";

grant trigger on table "public"."contact_chat_messages" to "service_role";

grant truncate on table "public"."contact_chat_messages" to "service_role";

grant update on table "public"."contact_chat_messages" to "service_role";

grant delete on table "public"."contact_chats" to "anon";

grant insert on table "public"."contact_chats" to "anon";

grant references on table "public"."contact_chats" to "anon";

grant select on table "public"."contact_chats" to "anon";

grant trigger on table "public"."contact_chats" to "anon";

grant truncate on table "public"."contact_chats" to "anon";

grant update on table "public"."contact_chats" to "anon";

grant delete on table "public"."contact_chats" to "authenticated";

grant insert on table "public"."contact_chats" to "authenticated";

grant references on table "public"."contact_chats" to "authenticated";

grant select on table "public"."contact_chats" to "authenticated";

grant trigger on table "public"."contact_chats" to "authenticated";

grant truncate on table "public"."contact_chats" to "authenticated";

grant update on table "public"."contact_chats" to "authenticated";

grant delete on table "public"."contact_chats" to "service_role";

grant insert on table "public"."contact_chats" to "service_role";

grant references on table "public"."contact_chats" to "service_role";

grant select on table "public"."contact_chats" to "service_role";

grant trigger on table "public"."contact_chats" to "service_role";

grant truncate on table "public"."contact_chats" to "service_role";

grant update on table "public"."contact_chats" to "service_role";

grant delete on table "public"."email_attachments" to "anon";

grant insert on table "public"."email_attachments" to "anon";

grant references on table "public"."email_attachments" to "anon";

grant select on table "public"."email_attachments" to "anon";

grant trigger on table "public"."email_attachments" to "anon";

grant truncate on table "public"."email_attachments" to "anon";

grant update on table "public"."email_attachments" to "anon";

grant delete on table "public"."email_attachments" to "authenticated";

grant insert on table "public"."email_attachments" to "authenticated";

grant references on table "public"."email_attachments" to "authenticated";

grant select on table "public"."email_attachments" to "authenticated";

grant trigger on table "public"."email_attachments" to "authenticated";

grant truncate on table "public"."email_attachments" to "authenticated";

grant update on table "public"."email_attachments" to "authenticated";

grant delete on table "public"."email_attachments" to "service_role";

grant insert on table "public"."email_attachments" to "service_role";

grant references on table "public"."email_attachments" to "service_role";

grant select on table "public"."email_attachments" to "service_role";

grant trigger on table "public"."email_attachments" to "service_role";

grant truncate on table "public"."email_attachments" to "service_role";

grant update on table "public"."email_attachments" to "service_role";

grant delete on table "public"."email_replies" to "anon";

grant insert on table "public"."email_replies" to "anon";

grant references on table "public"."email_replies" to "anon";

grant select on table "public"."email_replies" to "anon";

grant trigger on table "public"."email_replies" to "anon";

grant truncate on table "public"."email_replies" to "anon";

grant update on table "public"."email_replies" to "anon";

grant delete on table "public"."email_replies" to "authenticated";

grant insert on table "public"."email_replies" to "authenticated";

grant references on table "public"."email_replies" to "authenticated";

grant select on table "public"."email_replies" to "authenticated";

grant trigger on table "public"."email_replies" to "authenticated";

grant truncate on table "public"."email_replies" to "authenticated";

grant update on table "public"."email_replies" to "authenticated";

grant delete on table "public"."email_replies" to "service_role";

grant insert on table "public"."email_replies" to "service_role";

grant references on table "public"."email_replies" to "service_role";

grant select on table "public"."email_replies" to "service_role";

grant trigger on table "public"."email_replies" to "service_role";

grant truncate on table "public"."email_replies" to "service_role";

grant update on table "public"."email_replies" to "service_role";

grant delete on table "public"."email_settings" to "anon";

grant insert on table "public"."email_settings" to "anon";

grant references on table "public"."email_settings" to "anon";

grant select on table "public"."email_settings" to "anon";

grant trigger on table "public"."email_settings" to "anon";

grant truncate on table "public"."email_settings" to "anon";

grant update on table "public"."email_settings" to "anon";

grant delete on table "public"."email_settings" to "authenticated";

grant insert on table "public"."email_settings" to "authenticated";

grant references on table "public"."email_settings" to "authenticated";

grant select on table "public"."email_settings" to "authenticated";

grant trigger on table "public"."email_settings" to "authenticated";

grant truncate on table "public"."email_settings" to "authenticated";

grant update on table "public"."email_settings" to "authenticated";

grant delete on table "public"."email_settings" to "service_role";

grant insert on table "public"."email_settings" to "service_role";

grant references on table "public"."email_settings" to "service_role";

grant select on table "public"."email_settings" to "service_role";

grant trigger on table "public"."email_settings" to "service_role";

grant truncate on table "public"."email_settings" to "service_role";

grant update on table "public"."email_settings" to "service_role";

grant delete on table "public"."emails" to "anon";

grant insert on table "public"."emails" to "anon";

grant references on table "public"."emails" to "anon";

grant select on table "public"."emails" to "anon";

grant trigger on table "public"."emails" to "anon";

grant truncate on table "public"."emails" to "anon";

grant update on table "public"."emails" to "anon";

grant delete on table "public"."emails" to "authenticated";

grant insert on table "public"."emails" to "authenticated";

grant references on table "public"."emails" to "authenticated";

grant select on table "public"."emails" to "authenticated";

grant trigger on table "public"."emails" to "authenticated";

grant truncate on table "public"."emails" to "authenticated";

grant update on table "public"."emails" to "authenticated";

grant delete on table "public"."emails" to "service_role";

grant insert on table "public"."emails" to "service_role";

grant references on table "public"."emails" to "service_role";

grant select on table "public"."emails" to "service_role";

grant trigger on table "public"."emails" to "service_role";

grant truncate on table "public"."emails" to "service_role";

grant update on table "public"."emails" to "service_role";

grant delete on table "public"."estimate_features" to "anon";

grant insert on table "public"."estimate_features" to "anon";

grant references on table "public"."estimate_features" to "anon";

grant select on table "public"."estimate_features" to "anon";

grant trigger on table "public"."estimate_features" to "anon";

grant truncate on table "public"."estimate_features" to "anon";

grant update on table "public"."estimate_features" to "anon";

grant delete on table "public"."estimate_features" to "authenticated";

grant insert on table "public"."estimate_features" to "authenticated";

grant references on table "public"."estimate_features" to "authenticated";

grant select on table "public"."estimate_features" to "authenticated";

grant trigger on table "public"."estimate_features" to "authenticated";

grant truncate on table "public"."estimate_features" to "authenticated";

grant update on table "public"."estimate_features" to "authenticated";

grant delete on table "public"."estimate_features" to "service_role";

grant insert on table "public"."estimate_features" to "service_role";

grant references on table "public"."estimate_features" to "service_role";

grant select on table "public"."estimate_features" to "service_role";

grant trigger on table "public"."estimate_features" to "service_role";

grant truncate on table "public"."estimate_features" to "service_role";

grant update on table "public"."estimate_features" to "service_role";

grant delete on table "public"."estimate_requirements" to "anon";

grant insert on table "public"."estimate_requirements" to "anon";

grant references on table "public"."estimate_requirements" to "anon";

grant select on table "public"."estimate_requirements" to "anon";

grant trigger on table "public"."estimate_requirements" to "anon";

grant truncate on table "public"."estimate_requirements" to "anon";

grant update on table "public"."estimate_requirements" to "anon";

grant delete on table "public"."estimate_requirements" to "authenticated";

grant insert on table "public"."estimate_requirements" to "authenticated";

grant references on table "public"."estimate_requirements" to "authenticated";

grant select on table "public"."estimate_requirements" to "authenticated";

grant trigger on table "public"."estimate_requirements" to "authenticated";

grant truncate on table "public"."estimate_requirements" to "authenticated";

grant update on table "public"."estimate_requirements" to "authenticated";

grant delete on table "public"."estimate_requirements" to "service_role";

grant insert on table "public"."estimate_requirements" to "service_role";

grant references on table "public"."estimate_requirements" to "service_role";

grant select on table "public"."estimate_requirements" to "service_role";

grant trigger on table "public"."estimate_requirements" to "service_role";

grant truncate on table "public"."estimate_requirements" to "service_role";

grant update on table "public"."estimate_requirements" to "service_role";

grant delete on table "public"."estimates" to "anon";

grant insert on table "public"."estimates" to "anon";

grant references on table "public"."estimates" to "anon";

grant select on table "public"."estimates" to "anon";

grant trigger on table "public"."estimates" to "anon";

grant truncate on table "public"."estimates" to "anon";

grant update on table "public"."estimates" to "anon";

grant delete on table "public"."estimates" to "authenticated";

grant insert on table "public"."estimates" to "authenticated";

grant references on table "public"."estimates" to "authenticated";

grant select on table "public"."estimates" to "authenticated";

grant trigger on table "public"."estimates" to "authenticated";

grant truncate on table "public"."estimates" to "authenticated";

grant update on table "public"."estimates" to "authenticated";

grant delete on table "public"."estimates" to "service_role";

grant insert on table "public"."estimates" to "service_role";

grant references on table "public"."estimates" to "service_role";

grant select on table "public"."estimates" to "service_role";

grant trigger on table "public"."estimates" to "service_role";

grant truncate on table "public"."estimates" to "service_role";

grant update on table "public"."estimates" to "service_role";

grant delete on table "public"."faqs" to "anon";

grant insert on table "public"."faqs" to "anon";

grant references on table "public"."faqs" to "anon";

grant select on table "public"."faqs" to "anon";

grant trigger on table "public"."faqs" to "anon";

grant truncate on table "public"."faqs" to "anon";

grant update on table "public"."faqs" to "anon";

grant delete on table "public"."faqs" to "authenticated";

grant insert on table "public"."faqs" to "authenticated";

grant references on table "public"."faqs" to "authenticated";

grant select on table "public"."faqs" to "authenticated";

grant trigger on table "public"."faqs" to "authenticated";

grant truncate on table "public"."faqs" to "authenticated";

grant update on table "public"."faqs" to "authenticated";

grant delete on table "public"."faqs" to "service_role";

grant insert on table "public"."faqs" to "service_role";

grant references on table "public"."faqs" to "service_role";

grant select on table "public"."faqs" to "service_role";

grant trigger on table "public"."faqs" to "service_role";

grant truncate on table "public"."faqs" to "service_role";

grant update on table "public"."faqs" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";

grant delete on table "public"."focus_intervals" to "anon";

grant insert on table "public"."focus_intervals" to "anon";

grant references on table "public"."focus_intervals" to "anon";

grant select on table "public"."focus_intervals" to "anon";

grant trigger on table "public"."focus_intervals" to "anon";

grant truncate on table "public"."focus_intervals" to "anon";

grant update on table "public"."focus_intervals" to "anon";

grant delete on table "public"."focus_intervals" to "authenticated";

grant insert on table "public"."focus_intervals" to "authenticated";

grant references on table "public"."focus_intervals" to "authenticated";

grant select on table "public"."focus_intervals" to "authenticated";

grant trigger on table "public"."focus_intervals" to "authenticated";

grant truncate on table "public"."focus_intervals" to "authenticated";

grant update on table "public"."focus_intervals" to "authenticated";

grant delete on table "public"."focus_intervals" to "service_role";

grant insert on table "public"."focus_intervals" to "service_role";

grant references on table "public"."focus_intervals" to "service_role";

grant select on table "public"."focus_intervals" to "service_role";

grant trigger on table "public"."focus_intervals" to "service_role";

grant truncate on table "public"."focus_intervals" to "service_role";

grant update on table "public"."focus_intervals" to "service_role";

grant delete on table "public"."focus_sessions" to "anon";

grant insert on table "public"."focus_sessions" to "anon";

grant references on table "public"."focus_sessions" to "anon";

grant select on table "public"."focus_sessions" to "anon";

grant trigger on table "public"."focus_sessions" to "anon";

grant truncate on table "public"."focus_sessions" to "anon";

grant update on table "public"."focus_sessions" to "anon";

grant delete on table "public"."focus_sessions" to "authenticated";

grant insert on table "public"."focus_sessions" to "authenticated";

grant references on table "public"."focus_sessions" to "authenticated";

grant select on table "public"."focus_sessions" to "authenticated";

grant trigger on table "public"."focus_sessions" to "authenticated";

grant truncate on table "public"."focus_sessions" to "authenticated";

grant update on table "public"."focus_sessions" to "authenticated";

grant delete on table "public"."focus_sessions" to "service_role";

grant insert on table "public"."focus_sessions" to "service_role";

grant references on table "public"."focus_sessions" to "service_role";

grant select on table "public"."focus_sessions" to "service_role";

grant trigger on table "public"."focus_sessions" to "service_role";

grant truncate on table "public"."focus_sessions" to "service_role";

grant update on table "public"."focus_sessions" to "service_role";

grant delete on table "public"."github_contributions" to "anon";

grant insert on table "public"."github_contributions" to "anon";

grant references on table "public"."github_contributions" to "anon";

grant select on table "public"."github_contributions" to "anon";

grant trigger on table "public"."github_contributions" to "anon";

grant truncate on table "public"."github_contributions" to "anon";

grant update on table "public"."github_contributions" to "anon";

grant delete on table "public"."github_contributions" to "authenticated";

grant insert on table "public"."github_contributions" to "authenticated";

grant references on table "public"."github_contributions" to "authenticated";

grant select on table "public"."github_contributions" to "authenticated";

grant trigger on table "public"."github_contributions" to "authenticated";

grant truncate on table "public"."github_contributions" to "authenticated";

grant update on table "public"."github_contributions" to "authenticated";

grant delete on table "public"."github_contributions" to "service_role";

grant insert on table "public"."github_contributions" to "service_role";

grant references on table "public"."github_contributions" to "service_role";

grant select on table "public"."github_contributions" to "service_role";

grant trigger on table "public"."github_contributions" to "service_role";

grant truncate on table "public"."github_contributions" to "service_role";

grant update on table "public"."github_contributions" to "service_role";

grant delete on table "public"."github_settings" to "anon";

grant insert on table "public"."github_settings" to "anon";

grant references on table "public"."github_settings" to "anon";

grant select on table "public"."github_settings" to "anon";

grant trigger on table "public"."github_settings" to "anon";

grant truncate on table "public"."github_settings" to "anon";

grant update on table "public"."github_settings" to "anon";

grant delete on table "public"."github_settings" to "authenticated";

grant insert on table "public"."github_settings" to "authenticated";

grant references on table "public"."github_settings" to "authenticated";

grant select on table "public"."github_settings" to "authenticated";

grant trigger on table "public"."github_settings" to "authenticated";

grant truncate on table "public"."github_settings" to "authenticated";

grant update on table "public"."github_settings" to "authenticated";

grant delete on table "public"."github_settings" to "service_role";

grant insert on table "public"."github_settings" to "service_role";

grant references on table "public"."github_settings" to "service_role";

grant select on table "public"."github_settings" to "service_role";

grant trigger on table "public"."github_settings" to "service_role";

grant truncate on table "public"."github_settings" to "service_role";

grant update on table "public"."github_settings" to "service_role";

grant delete on table "public"."gmail_credentials" to "anon";

grant insert on table "public"."gmail_credentials" to "anon";

grant references on table "public"."gmail_credentials" to "anon";

grant select on table "public"."gmail_credentials" to "anon";

grant trigger on table "public"."gmail_credentials" to "anon";

grant truncate on table "public"."gmail_credentials" to "anon";

grant update on table "public"."gmail_credentials" to "anon";

grant delete on table "public"."gmail_credentials" to "authenticated";

grant insert on table "public"."gmail_credentials" to "authenticated";

grant references on table "public"."gmail_credentials" to "authenticated";

grant select on table "public"."gmail_credentials" to "authenticated";

grant trigger on table "public"."gmail_credentials" to "authenticated";

grant truncate on table "public"."gmail_credentials" to "authenticated";

grant update on table "public"."gmail_credentials" to "authenticated";

grant delete on table "public"."gmail_credentials" to "service_role";

grant insert on table "public"."gmail_credentials" to "service_role";

grant references on table "public"."gmail_credentials" to "service_role";

grant select on table "public"."gmail_credentials" to "service_role";

grant trigger on table "public"."gmail_credentials" to "service_role";

grant truncate on table "public"."gmail_credentials" to "service_role";

grant update on table "public"."gmail_credentials" to "service_role";

grant delete on table "public"."knowledge_page_collaborators" to "anon";

grant insert on table "public"."knowledge_page_collaborators" to "anon";

grant references on table "public"."knowledge_page_collaborators" to "anon";

grant select on table "public"."knowledge_page_collaborators" to "anon";

grant trigger on table "public"."knowledge_page_collaborators" to "anon";

grant truncate on table "public"."knowledge_page_collaborators" to "anon";

grant update on table "public"."knowledge_page_collaborators" to "anon";

grant delete on table "public"."knowledge_page_collaborators" to "authenticated";

grant insert on table "public"."knowledge_page_collaborators" to "authenticated";

grant references on table "public"."knowledge_page_collaborators" to "authenticated";

grant select on table "public"."knowledge_page_collaborators" to "authenticated";

grant trigger on table "public"."knowledge_page_collaborators" to "authenticated";

grant truncate on table "public"."knowledge_page_collaborators" to "authenticated";

grant update on table "public"."knowledge_page_collaborators" to "authenticated";

grant delete on table "public"."knowledge_page_collaborators" to "service_role";

grant insert on table "public"."knowledge_page_collaborators" to "service_role";

grant references on table "public"."knowledge_page_collaborators" to "service_role";

grant select on table "public"."knowledge_page_collaborators" to "service_role";

grant trigger on table "public"."knowledge_page_collaborators" to "service_role";

grant truncate on table "public"."knowledge_page_collaborators" to "service_role";

grant update on table "public"."knowledge_page_collaborators" to "service_role";

grant delete on table "public"."knowledge_page_details" to "anon";

grant insert on table "public"."knowledge_page_details" to "anon";

grant references on table "public"."knowledge_page_details" to "anon";

grant select on table "public"."knowledge_page_details" to "anon";

grant trigger on table "public"."knowledge_page_details" to "anon";

grant truncate on table "public"."knowledge_page_details" to "anon";

grant update on table "public"."knowledge_page_details" to "anon";

grant delete on table "public"."knowledge_page_details" to "authenticated";

grant insert on table "public"."knowledge_page_details" to "authenticated";

grant references on table "public"."knowledge_page_details" to "authenticated";

grant select on table "public"."knowledge_page_details" to "authenticated";

grant trigger on table "public"."knowledge_page_details" to "authenticated";

grant truncate on table "public"."knowledge_page_details" to "authenticated";

grant update on table "public"."knowledge_page_details" to "authenticated";

grant delete on table "public"."knowledge_page_details" to "service_role";

grant insert on table "public"."knowledge_page_details" to "service_role";

grant references on table "public"."knowledge_page_details" to "service_role";

grant select on table "public"."knowledge_page_details" to "service_role";

grant trigger on table "public"."knowledge_page_details" to "service_role";

grant truncate on table "public"."knowledge_page_details" to "service_role";

grant update on table "public"."knowledge_page_details" to "service_role";

grant delete on table "public"."knowledge_page_links" to "anon";

grant insert on table "public"."knowledge_page_links" to "anon";

grant references on table "public"."knowledge_page_links" to "anon";

grant select on table "public"."knowledge_page_links" to "anon";

grant trigger on table "public"."knowledge_page_links" to "anon";

grant truncate on table "public"."knowledge_page_links" to "anon";

grant update on table "public"."knowledge_page_links" to "anon";

grant delete on table "public"."knowledge_page_links" to "authenticated";

grant insert on table "public"."knowledge_page_links" to "authenticated";

grant references on table "public"."knowledge_page_links" to "authenticated";

grant select on table "public"."knowledge_page_links" to "authenticated";

grant trigger on table "public"."knowledge_page_links" to "authenticated";

grant truncate on table "public"."knowledge_page_links" to "authenticated";

grant update on table "public"."knowledge_page_links" to "authenticated";

grant delete on table "public"."knowledge_page_links" to "service_role";

grant insert on table "public"."knowledge_page_links" to "service_role";

grant references on table "public"."knowledge_page_links" to "service_role";

grant select on table "public"."knowledge_page_links" to "service_role";

grant trigger on table "public"."knowledge_page_links" to "service_role";

grant truncate on table "public"."knowledge_page_links" to "service_role";

grant update on table "public"."knowledge_page_links" to "service_role";

grant delete on table "public"."knowledge_pages" to "anon";

grant insert on table "public"."knowledge_pages" to "anon";

grant references on table "public"."knowledge_pages" to "anon";

grant select on table "public"."knowledge_pages" to "anon";

grant trigger on table "public"."knowledge_pages" to "anon";

grant truncate on table "public"."knowledge_pages" to "anon";

grant update on table "public"."knowledge_pages" to "anon";

grant delete on table "public"."knowledge_pages" to "authenticated";

grant insert on table "public"."knowledge_pages" to "authenticated";

grant references on table "public"."knowledge_pages" to "authenticated";

grant select on table "public"."knowledge_pages" to "authenticated";

grant trigger on table "public"."knowledge_pages" to "authenticated";

grant truncate on table "public"."knowledge_pages" to "authenticated";

grant update on table "public"."knowledge_pages" to "authenticated";

grant delete on table "public"."knowledge_pages" to "service_role";

grant insert on table "public"."knowledge_pages" to "service_role";

grant references on table "public"."knowledge_pages" to "service_role";

grant select on table "public"."knowledge_pages" to "service_role";

grant trigger on table "public"."knowledge_pages" to "service_role";

grant truncate on table "public"."knowledge_pages" to "service_role";

grant update on table "public"."knowledge_pages" to "service_role";

grant delete on table "public"."knowledge_projects" to "anon";

grant insert on table "public"."knowledge_projects" to "anon";

grant references on table "public"."knowledge_projects" to "anon";

grant select on table "public"."knowledge_projects" to "anon";

grant trigger on table "public"."knowledge_projects" to "anon";

grant truncate on table "public"."knowledge_projects" to "anon";

grant update on table "public"."knowledge_projects" to "anon";

grant delete on table "public"."knowledge_projects" to "authenticated";

grant insert on table "public"."knowledge_projects" to "authenticated";

grant references on table "public"."knowledge_projects" to "authenticated";

grant select on table "public"."knowledge_projects" to "authenticated";

grant trigger on table "public"."knowledge_projects" to "authenticated";

grant truncate on table "public"."knowledge_projects" to "authenticated";

grant update on table "public"."knowledge_projects" to "authenticated";

grant delete on table "public"."knowledge_projects" to "service_role";

grant insert on table "public"."knowledge_projects" to "service_role";

grant references on table "public"."knowledge_projects" to "service_role";

grant select on table "public"."knowledge_projects" to "service_role";

grant trigger on table "public"."knowledge_projects" to "service_role";

grant truncate on table "public"."knowledge_projects" to "service_role";

grant update on table "public"."knowledge_projects" to "service_role";

grant delete on table "public"."knowledge_sync_logs" to "anon";

grant insert on table "public"."knowledge_sync_logs" to "anon";

grant references on table "public"."knowledge_sync_logs" to "anon";

grant select on table "public"."knowledge_sync_logs" to "anon";

grant trigger on table "public"."knowledge_sync_logs" to "anon";

grant truncate on table "public"."knowledge_sync_logs" to "anon";

grant update on table "public"."knowledge_sync_logs" to "anon";

grant delete on table "public"."knowledge_sync_logs" to "authenticated";

grant insert on table "public"."knowledge_sync_logs" to "authenticated";

grant references on table "public"."knowledge_sync_logs" to "authenticated";

grant select on table "public"."knowledge_sync_logs" to "authenticated";

grant trigger on table "public"."knowledge_sync_logs" to "authenticated";

grant truncate on table "public"."knowledge_sync_logs" to "authenticated";

grant update on table "public"."knowledge_sync_logs" to "authenticated";

grant delete on table "public"."knowledge_sync_logs" to "service_role";

grant insert on table "public"."knowledge_sync_logs" to "service_role";

grant references on table "public"."knowledge_sync_logs" to "service_role";

grant select on table "public"."knowledge_sync_logs" to "service_role";

grant trigger on table "public"."knowledge_sync_logs" to "service_role";

grant truncate on table "public"."knowledge_sync_logs" to "service_role";

grant update on table "public"."knowledge_sync_logs" to "service_role";

grant delete on table "public"."knowledge_users" to "anon";

grant insert on table "public"."knowledge_users" to "anon";

grant references on table "public"."knowledge_users" to "anon";

grant select on table "public"."knowledge_users" to "anon";

grant trigger on table "public"."knowledge_users" to "anon";

grant truncate on table "public"."knowledge_users" to "anon";

grant update on table "public"."knowledge_users" to "anon";

grant delete on table "public"."knowledge_users" to "authenticated";

grant insert on table "public"."knowledge_users" to "authenticated";

grant references on table "public"."knowledge_users" to "authenticated";

grant select on table "public"."knowledge_users" to "authenticated";

grant trigger on table "public"."knowledge_users" to "authenticated";

grant truncate on table "public"."knowledge_users" to "authenticated";

grant update on table "public"."knowledge_users" to "authenticated";

grant delete on table "public"."knowledge_users" to "service_role";

grant insert on table "public"."knowledge_users" to "service_role";

grant references on table "public"."knowledge_users" to "service_role";

grant select on table "public"."knowledge_users" to "service_role";

grant trigger on table "public"."knowledge_users" to "service_role";

grant truncate on table "public"."knowledge_users" to "service_role";

grant update on table "public"."knowledge_users" to "service_role";

grant delete on table "public"."metrics" to "anon";

grant insert on table "public"."metrics" to "anon";

grant references on table "public"."metrics" to "anon";

grant select on table "public"."metrics" to "anon";

grant trigger on table "public"."metrics" to "anon";

grant truncate on table "public"."metrics" to "anon";

grant update on table "public"."metrics" to "anon";

grant delete on table "public"."metrics" to "authenticated";

grant insert on table "public"."metrics" to "authenticated";

grant references on table "public"."metrics" to "authenticated";

grant select on table "public"."metrics" to "authenticated";

grant trigger on table "public"."metrics" to "authenticated";

grant truncate on table "public"."metrics" to "authenticated";

grant update on table "public"."metrics" to "authenticated";

grant delete on table "public"."metrics" to "service_role";

grant insert on table "public"."metrics" to "service_role";

grant references on table "public"."metrics" to "service_role";

grant select on table "public"."metrics" to "service_role";

grant trigger on table "public"."metrics" to "service_role";

grant truncate on table "public"."metrics" to "service_role";

grant update on table "public"."metrics" to "service_role";

grant delete on table "public"."notification_settings" to "anon";

grant insert on table "public"."notification_settings" to "anon";

grant references on table "public"."notification_settings" to "anon";

grant select on table "public"."notification_settings" to "anon";

grant trigger on table "public"."notification_settings" to "anon";

grant truncate on table "public"."notification_settings" to "anon";

grant update on table "public"."notification_settings" to "anon";

grant delete on table "public"."notification_settings" to "authenticated";

grant insert on table "public"."notification_settings" to "authenticated";

grant references on table "public"."notification_settings" to "authenticated";

grant select on table "public"."notification_settings" to "authenticated";

grant trigger on table "public"."notification_settings" to "authenticated";

grant truncate on table "public"."notification_settings" to "authenticated";

grant update on table "public"."notification_settings" to "authenticated";

grant delete on table "public"."notification_settings" to "service_role";

grant insert on table "public"."notification_settings" to "service_role";

grant references on table "public"."notification_settings" to "service_role";

grant select on table "public"."notification_settings" to "service_role";

grant trigger on table "public"."notification_settings" to "service_role";

grant truncate on table "public"."notification_settings" to "service_role";

grant update on table "public"."notification_settings" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."otp_challenges" to "anon";

grant insert on table "public"."otp_challenges" to "anon";

grant references on table "public"."otp_challenges" to "anon";

grant select on table "public"."otp_challenges" to "anon";

grant trigger on table "public"."otp_challenges" to "anon";

grant truncate on table "public"."otp_challenges" to "anon";

grant update on table "public"."otp_challenges" to "anon";

grant delete on table "public"."otp_challenges" to "authenticated";

grant insert on table "public"."otp_challenges" to "authenticated";

grant references on table "public"."otp_challenges" to "authenticated";

grant select on table "public"."otp_challenges" to "authenticated";

grant trigger on table "public"."otp_challenges" to "authenticated";

grant truncate on table "public"."otp_challenges" to "authenticated";

grant update on table "public"."otp_challenges" to "authenticated";

grant delete on table "public"."otp_challenges" to "service_role";

grant insert on table "public"."otp_challenges" to "service_role";

grant references on table "public"."otp_challenges" to "service_role";

grant select on table "public"."otp_challenges" to "service_role";

grant trigger on table "public"."otp_challenges" to "service_role";

grant truncate on table "public"."otp_challenges" to "service_role";

grant update on table "public"."otp_challenges" to "service_role";

grant delete on table "public"."otp_settings" to "anon";

grant insert on table "public"."otp_settings" to "anon";

grant references on table "public"."otp_settings" to "anon";

grant select on table "public"."otp_settings" to "anon";

grant trigger on table "public"."otp_settings" to "anon";

grant truncate on table "public"."otp_settings" to "anon";

grant update on table "public"."otp_settings" to "anon";

grant delete on table "public"."otp_settings" to "authenticated";

grant insert on table "public"."otp_settings" to "authenticated";

grant references on table "public"."otp_settings" to "authenticated";

grant select on table "public"."otp_settings" to "authenticated";

grant trigger on table "public"."otp_settings" to "authenticated";

grant truncate on table "public"."otp_settings" to "authenticated";

grant update on table "public"."otp_settings" to "authenticated";

grant delete on table "public"."otp_settings" to "service_role";

grant insert on table "public"."otp_settings" to "service_role";

grant references on table "public"."otp_settings" to "service_role";

grant select on table "public"."otp_settings" to "service_role";

grant trigger on table "public"."otp_settings" to "service_role";

grant truncate on table "public"."otp_settings" to "service_role";

grant update on table "public"."otp_settings" to "service_role";

grant delete on table "public"."permissions" to "anon";

grant insert on table "public"."permissions" to "anon";

grant references on table "public"."permissions" to "anon";

grant select on table "public"."permissions" to "anon";

grant trigger on table "public"."permissions" to "anon";

grant truncate on table "public"."permissions" to "anon";

grant update on table "public"."permissions" to "anon";

grant delete on table "public"."permissions" to "authenticated";

grant insert on table "public"."permissions" to "authenticated";

grant references on table "public"."permissions" to "authenticated";

grant select on table "public"."permissions" to "authenticated";

grant trigger on table "public"."permissions" to "authenticated";

grant truncate on table "public"."permissions" to "authenticated";

grant update on table "public"."permissions" to "authenticated";

grant delete on table "public"."permissions" to "service_role";

grant insert on table "public"."permissions" to "service_role";

grant references on table "public"."permissions" to "service_role";

grant select on table "public"."permissions" to "service_role";

grant trigger on table "public"."permissions" to "service_role";

grant truncate on table "public"."permissions" to "service_role";

grant update on table "public"."permissions" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."project_github_integrations" to "anon";

grant insert on table "public"."project_github_integrations" to "anon";

grant references on table "public"."project_github_integrations" to "anon";

grant select on table "public"."project_github_integrations" to "anon";

grant trigger on table "public"."project_github_integrations" to "anon";

grant truncate on table "public"."project_github_integrations" to "anon";

grant update on table "public"."project_github_integrations" to "anon";

grant delete on table "public"."project_github_integrations" to "authenticated";

grant insert on table "public"."project_github_integrations" to "authenticated";

grant references on table "public"."project_github_integrations" to "authenticated";

grant select on table "public"."project_github_integrations" to "authenticated";

grant trigger on table "public"."project_github_integrations" to "authenticated";

grant truncate on table "public"."project_github_integrations" to "authenticated";

grant update on table "public"."project_github_integrations" to "authenticated";

grant delete on table "public"."project_github_integrations" to "service_role";

grant insert on table "public"."project_github_integrations" to "service_role";

grant references on table "public"."project_github_integrations" to "service_role";

grant select on table "public"."project_github_integrations" to "service_role";

grant trigger on table "public"."project_github_integrations" to "service_role";

grant truncate on table "public"."project_github_integrations" to "service_role";

grant update on table "public"."project_github_integrations" to "service_role";

grant delete on table "public"."project_milestones" to "anon";

grant insert on table "public"."project_milestones" to "anon";

grant references on table "public"."project_milestones" to "anon";

grant select on table "public"."project_milestones" to "anon";

grant trigger on table "public"."project_milestones" to "anon";

grant truncate on table "public"."project_milestones" to "anon";

grant update on table "public"."project_milestones" to "anon";

grant delete on table "public"."project_milestones" to "authenticated";

grant insert on table "public"."project_milestones" to "authenticated";

grant references on table "public"."project_milestones" to "authenticated";

grant select on table "public"."project_milestones" to "authenticated";

grant trigger on table "public"."project_milestones" to "authenticated";

grant truncate on table "public"."project_milestones" to "authenticated";

grant update on table "public"."project_milestones" to "authenticated";

grant delete on table "public"."project_milestones" to "service_role";

grant insert on table "public"."project_milestones" to "service_role";

grant references on table "public"."project_milestones" to "service_role";

grant select on table "public"."project_milestones" to "service_role";

grant trigger on table "public"."project_milestones" to "service_role";

grant truncate on table "public"."project_milestones" to "service_role";

grant update on table "public"."project_milestones" to "service_role";

grant delete on table "public"."project_progress_logs" to "anon";

grant insert on table "public"."project_progress_logs" to "anon";

grant references on table "public"."project_progress_logs" to "anon";

grant select on table "public"."project_progress_logs" to "anon";

grant trigger on table "public"."project_progress_logs" to "anon";

grant truncate on table "public"."project_progress_logs" to "anon";

grant update on table "public"."project_progress_logs" to "anon";

grant delete on table "public"."project_progress_logs" to "authenticated";

grant insert on table "public"."project_progress_logs" to "authenticated";

grant references on table "public"."project_progress_logs" to "authenticated";

grant select on table "public"."project_progress_logs" to "authenticated";

grant trigger on table "public"."project_progress_logs" to "authenticated";

grant truncate on table "public"."project_progress_logs" to "authenticated";

grant update on table "public"."project_progress_logs" to "authenticated";

grant delete on table "public"."project_progress_logs" to "service_role";

grant insert on table "public"."project_progress_logs" to "service_role";

grant references on table "public"."project_progress_logs" to "service_role";

grant select on table "public"."project_progress_logs" to "service_role";

grant trigger on table "public"."project_progress_logs" to "service_role";

grant truncate on table "public"."project_progress_logs" to "service_role";

grant update on table "public"."project_progress_logs" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."role_audit_logs" to "anon";

grant insert on table "public"."role_audit_logs" to "anon";

grant references on table "public"."role_audit_logs" to "anon";

grant select on table "public"."role_audit_logs" to "anon";

grant trigger on table "public"."role_audit_logs" to "anon";

grant truncate on table "public"."role_audit_logs" to "anon";

grant update on table "public"."role_audit_logs" to "anon";

grant delete on table "public"."role_audit_logs" to "authenticated";

grant insert on table "public"."role_audit_logs" to "authenticated";

grant references on table "public"."role_audit_logs" to "authenticated";

grant select on table "public"."role_audit_logs" to "authenticated";

grant trigger on table "public"."role_audit_logs" to "authenticated";

grant truncate on table "public"."role_audit_logs" to "authenticated";

grant update on table "public"."role_audit_logs" to "authenticated";

grant delete on table "public"."role_audit_logs" to "service_role";

grant insert on table "public"."role_audit_logs" to "service_role";

grant references on table "public"."role_audit_logs" to "service_role";

grant select on table "public"."role_audit_logs" to "service_role";

grant trigger on table "public"."role_audit_logs" to "service_role";

grant truncate on table "public"."role_audit_logs" to "service_role";

grant update on table "public"."role_audit_logs" to "service_role";

grant delete on table "public"."role_permissions" to "anon";

grant insert on table "public"."role_permissions" to "anon";

grant references on table "public"."role_permissions" to "anon";

grant select on table "public"."role_permissions" to "anon";

grant trigger on table "public"."role_permissions" to "anon";

grant truncate on table "public"."role_permissions" to "anon";

grant update on table "public"."role_permissions" to "anon";

grant delete on table "public"."role_permissions" to "authenticated";

grant insert on table "public"."role_permissions" to "authenticated";

grant references on table "public"."role_permissions" to "authenticated";

grant select on table "public"."role_permissions" to "authenticated";

grant trigger on table "public"."role_permissions" to "authenticated";

grant truncate on table "public"."role_permissions" to "authenticated";

grant update on table "public"."role_permissions" to "authenticated";

grant delete on table "public"."role_permissions" to "service_role";

grant insert on table "public"."role_permissions" to "service_role";

grant references on table "public"."role_permissions" to "service_role";

grant select on table "public"."role_permissions" to "service_role";

grant trigger on table "public"."role_permissions" to "service_role";

grant truncate on table "public"."role_permissions" to "service_role";

grant update on table "public"."role_permissions" to "service_role";

grant delete on table "public"."role_policies" to "anon";

grant insert on table "public"."role_policies" to "anon";

grant references on table "public"."role_policies" to "anon";

grant select on table "public"."role_policies" to "anon";

grant trigger on table "public"."role_policies" to "anon";

grant truncate on table "public"."role_policies" to "anon";

grant update on table "public"."role_policies" to "anon";

grant delete on table "public"."role_policies" to "authenticated";

grant insert on table "public"."role_policies" to "authenticated";

grant references on table "public"."role_policies" to "authenticated";

grant select on table "public"."role_policies" to "authenticated";

grant trigger on table "public"."role_policies" to "authenticated";

grant truncate on table "public"."role_policies" to "authenticated";

grant update on table "public"."role_policies" to "authenticated";

grant delete on table "public"."role_policies" to "service_role";

grant insert on table "public"."role_policies" to "service_role";

grant references on table "public"."role_policies" to "service_role";

grant select on table "public"."role_policies" to "service_role";

grant trigger on table "public"."role_policies" to "service_role";

grant truncate on table "public"."role_policies" to "service_role";

grant update on table "public"."role_policies" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."session_policies" to "anon";

grant insert on table "public"."session_policies" to "anon";

grant references on table "public"."session_policies" to "anon";

grant select on table "public"."session_policies" to "anon";

grant trigger on table "public"."session_policies" to "anon";

grant truncate on table "public"."session_policies" to "anon";

grant update on table "public"."session_policies" to "anon";

grant delete on table "public"."session_policies" to "authenticated";

grant insert on table "public"."session_policies" to "authenticated";

grant references on table "public"."session_policies" to "authenticated";

grant select on table "public"."session_policies" to "authenticated";

grant trigger on table "public"."session_policies" to "authenticated";

grant truncate on table "public"."session_policies" to "authenticated";

grant update on table "public"."session_policies" to "authenticated";

grant delete on table "public"."session_policies" to "service_role";

grant insert on table "public"."session_policies" to "service_role";

grant references on table "public"."session_policies" to "service_role";

grant select on table "public"."session_policies" to "service_role";

grant trigger on table "public"."session_policies" to "service_role";

grant truncate on table "public"."session_policies" to "service_role";

grant update on table "public"."session_policies" to "service_role";

grant delete on table "public"."site_settings" to "anon";

grant insert on table "public"."site_settings" to "anon";

grant references on table "public"."site_settings" to "anon";

grant select on table "public"."site_settings" to "anon";

grant trigger on table "public"."site_settings" to "anon";

grant truncate on table "public"."site_settings" to "anon";

grant update on table "public"."site_settings" to "anon";

grant delete on table "public"."site_settings" to "authenticated";

grant insert on table "public"."site_settings" to "authenticated";

grant references on table "public"."site_settings" to "authenticated";

grant select on table "public"."site_settings" to "authenticated";

grant trigger on table "public"."site_settings" to "authenticated";

grant truncate on table "public"."site_settings" to "authenticated";

grant update on table "public"."site_settings" to "authenticated";

grant delete on table "public"."site_settings" to "service_role";

grant insert on table "public"."site_settings" to "service_role";

grant references on table "public"."site_settings" to "service_role";

grant select on table "public"."site_settings" to "service_role";

grant trigger on table "public"."site_settings" to "service_role";

grant truncate on table "public"."site_settings" to "service_role";

grant update on table "public"."site_settings" to "service_role";

grant delete on table "public"."skill_categories" to "anon";

grant insert on table "public"."skill_categories" to "anon";

grant references on table "public"."skill_categories" to "anon";

grant select on table "public"."skill_categories" to "anon";

grant trigger on table "public"."skill_categories" to "anon";

grant truncate on table "public"."skill_categories" to "anon";

grant update on table "public"."skill_categories" to "anon";

grant delete on table "public"."skill_categories" to "authenticated";

grant insert on table "public"."skill_categories" to "authenticated";

grant references on table "public"."skill_categories" to "authenticated";

grant select on table "public"."skill_categories" to "authenticated";

grant trigger on table "public"."skill_categories" to "authenticated";

grant truncate on table "public"."skill_categories" to "authenticated";

grant update on table "public"."skill_categories" to "authenticated";

grant delete on table "public"."skill_categories" to "service_role";

grant insert on table "public"."skill_categories" to "service_role";

grant references on table "public"."skill_categories" to "service_role";

grant select on table "public"."skill_categories" to "service_role";

grant trigger on table "public"."skill_categories" to "service_role";

grant truncate on table "public"."skill_categories" to "service_role";

grant update on table "public"."skill_categories" to "service_role";

grant delete on table "public"."skill_category_relations" to "anon";

grant insert on table "public"."skill_category_relations" to "anon";

grant references on table "public"."skill_category_relations" to "anon";

grant select on table "public"."skill_category_relations" to "anon";

grant trigger on table "public"."skill_category_relations" to "anon";

grant truncate on table "public"."skill_category_relations" to "anon";

grant update on table "public"."skill_category_relations" to "anon";

grant delete on table "public"."skill_category_relations" to "authenticated";

grant insert on table "public"."skill_category_relations" to "authenticated";

grant references on table "public"."skill_category_relations" to "authenticated";

grant select on table "public"."skill_category_relations" to "authenticated";

grant trigger on table "public"."skill_category_relations" to "authenticated";

grant truncate on table "public"."skill_category_relations" to "authenticated";

grant update on table "public"."skill_category_relations" to "authenticated";

grant delete on table "public"."skill_category_relations" to "service_role";

grant insert on table "public"."skill_category_relations" to "service_role";

grant references on table "public"."skill_category_relations" to "service_role";

grant select on table "public"."skill_category_relations" to "service_role";

grant trigger on table "public"."skill_category_relations" to "service_role";

grant truncate on table "public"."skill_category_relations" to "service_role";

grant update on table "public"."skill_category_relations" to "service_role";

grant delete on table "public"."skill_experiences" to "anon";

grant insert on table "public"."skill_experiences" to "anon";

grant references on table "public"."skill_experiences" to "anon";

grant select on table "public"."skill_experiences" to "anon";

grant trigger on table "public"."skill_experiences" to "anon";

grant truncate on table "public"."skill_experiences" to "anon";

grant update on table "public"."skill_experiences" to "anon";

grant delete on table "public"."skill_experiences" to "authenticated";

grant insert on table "public"."skill_experiences" to "authenticated";

grant references on table "public"."skill_experiences" to "authenticated";

grant select on table "public"."skill_experiences" to "authenticated";

grant trigger on table "public"."skill_experiences" to "authenticated";

grant truncate on table "public"."skill_experiences" to "authenticated";

grant update on table "public"."skill_experiences" to "authenticated";

grant delete on table "public"."skill_experiences" to "service_role";

grant insert on table "public"."skill_experiences" to "service_role";

grant references on table "public"."skill_experiences" to "service_role";

grant select on table "public"."skill_experiences" to "service_role";

grant trigger on table "public"."skill_experiences" to "service_role";

grant truncate on table "public"."skill_experiences" to "service_role";

grant update on table "public"."skill_experiences" to "service_role";

grant delete on table "public"."skill_features" to "anon";

grant insert on table "public"."skill_features" to "anon";

grant references on table "public"."skill_features" to "anon";

grant select on table "public"."skill_features" to "anon";

grant trigger on table "public"."skill_features" to "anon";

grant truncate on table "public"."skill_features" to "anon";

grant update on table "public"."skill_features" to "anon";

grant delete on table "public"."skill_features" to "authenticated";

grant insert on table "public"."skill_features" to "authenticated";

grant references on table "public"."skill_features" to "authenticated";

grant select on table "public"."skill_features" to "authenticated";

grant trigger on table "public"."skill_features" to "authenticated";

grant truncate on table "public"."skill_features" to "authenticated";

grant update on table "public"."skill_features" to "authenticated";

grant delete on table "public"."skill_features" to "service_role";

grant insert on table "public"."skill_features" to "service_role";

grant references on table "public"."skill_features" to "service_role";

grant select on table "public"."skill_features" to "service_role";

grant trigger on table "public"."skill_features" to "service_role";

grant truncate on table "public"."skill_features" to "service_role";

grant update on table "public"."skill_features" to "service_role";

grant delete on table "public"."skills" to "anon";

grant insert on table "public"."skills" to "anon";

grant references on table "public"."skills" to "anon";

grant select on table "public"."skills" to "anon";

grant trigger on table "public"."skills" to "anon";

grant truncate on table "public"."skills" to "anon";

grant update on table "public"."skills" to "anon";

grant delete on table "public"."skills" to "authenticated";

grant insert on table "public"."skills" to "authenticated";

grant references on table "public"."skills" to "authenticated";

grant select on table "public"."skills" to "authenticated";

grant trigger on table "public"."skills" to "authenticated";

grant truncate on table "public"."skills" to "authenticated";

grant update on table "public"."skills" to "authenticated";

grant delete on table "public"."skills" to "service_role";

grant insert on table "public"."skills" to "service_role";

grant references on table "public"."skills" to "service_role";

grant select on table "public"."skills" to "service_role";

grant trigger on table "public"."skills" to "service_role";

grant truncate on table "public"."skills" to "service_role";

grant update on table "public"."skills" to "service_role";

grant delete on table "public"."sync_errors" to "anon";

grant insert on table "public"."sync_errors" to "anon";

grant references on table "public"."sync_errors" to "anon";

grant select on table "public"."sync_errors" to "anon";

grant trigger on table "public"."sync_errors" to "anon";

grant truncate on table "public"."sync_errors" to "anon";

grant update on table "public"."sync_errors" to "anon";

grant delete on table "public"."sync_errors" to "authenticated";

grant insert on table "public"."sync_errors" to "authenticated";

grant references on table "public"."sync_errors" to "authenticated";

grant select on table "public"."sync_errors" to "authenticated";

grant trigger on table "public"."sync_errors" to "authenticated";

grant truncate on table "public"."sync_errors" to "authenticated";

grant update on table "public"."sync_errors" to "authenticated";

grant delete on table "public"."sync_errors" to "service_role";

grant insert on table "public"."sync_errors" to "service_role";

grant references on table "public"."sync_errors" to "service_role";

grant select on table "public"."sync_errors" to "service_role";

grant trigger on table "public"."sync_errors" to "service_role";

grant truncate on table "public"."sync_errors" to "service_role";

grant update on table "public"."sync_errors" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."technologies" to "anon";

grant insert on table "public"."technologies" to "anon";

grant references on table "public"."technologies" to "anon";

grant select on table "public"."technologies" to "anon";

grant trigger on table "public"."technologies" to "anon";

grant truncate on table "public"."technologies" to "anon";

grant update on table "public"."technologies" to "anon";

grant delete on table "public"."technologies" to "authenticated";

grant insert on table "public"."technologies" to "authenticated";

grant references on table "public"."technologies" to "authenticated";

grant select on table "public"."technologies" to "authenticated";

grant trigger on table "public"."technologies" to "authenticated";

grant truncate on table "public"."technologies" to "authenticated";

grant update on table "public"."technologies" to "authenticated";

grant delete on table "public"."technologies" to "service_role";

grant insert on table "public"."technologies" to "service_role";

grant references on table "public"."technologies" to "service_role";

grant select on table "public"."technologies" to "service_role";

grant trigger on table "public"."technologies" to "service_role";

grant truncate on table "public"."technologies" to "service_role";

grant update on table "public"."technologies" to "service_role";

grant delete on table "public"."trusted_devices" to "anon";

grant insert on table "public"."trusted_devices" to "anon";

grant references on table "public"."trusted_devices" to "anon";

grant select on table "public"."trusted_devices" to "anon";

grant trigger on table "public"."trusted_devices" to "anon";

grant truncate on table "public"."trusted_devices" to "anon";

grant update on table "public"."trusted_devices" to "anon";

grant delete on table "public"."trusted_devices" to "authenticated";

grant insert on table "public"."trusted_devices" to "authenticated";

grant references on table "public"."trusted_devices" to "authenticated";

grant select on table "public"."trusted_devices" to "authenticated";

grant trigger on table "public"."trusted_devices" to "authenticated";

grant truncate on table "public"."trusted_devices" to "authenticated";

grant update on table "public"."trusted_devices" to "authenticated";

grant delete on table "public"."trusted_devices" to "service_role";

grant insert on table "public"."trusted_devices" to "service_role";

grant references on table "public"."trusted_devices" to "service_role";

grant select on table "public"."trusted_devices" to "service_role";

grant trigger on table "public"."trusted_devices" to "service_role";

grant truncate on table "public"."trusted_devices" to "service_role";

grant update on table "public"."trusted_devices" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";

grant delete on table "public"."work_challenges" to "anon";

grant insert on table "public"."work_challenges" to "anon";

grant references on table "public"."work_challenges" to "anon";

grant select on table "public"."work_challenges" to "anon";

grant trigger on table "public"."work_challenges" to "anon";

grant truncate on table "public"."work_challenges" to "anon";

grant update on table "public"."work_challenges" to "anon";

grant delete on table "public"."work_challenges" to "authenticated";

grant insert on table "public"."work_challenges" to "authenticated";

grant references on table "public"."work_challenges" to "authenticated";

grant select on table "public"."work_challenges" to "authenticated";

grant trigger on table "public"."work_challenges" to "authenticated";

grant truncate on table "public"."work_challenges" to "authenticated";

grant update on table "public"."work_challenges" to "authenticated";

grant delete on table "public"."work_challenges" to "service_role";

grant insert on table "public"."work_challenges" to "service_role";

grant references on table "public"."work_challenges" to "service_role";

grant select on table "public"."work_challenges" to "service_role";

grant trigger on table "public"."work_challenges" to "service_role";

grant truncate on table "public"."work_challenges" to "service_role";

grant update on table "public"."work_challenges" to "service_role";

grant delete on table "public"."work_details" to "anon";

grant insert on table "public"."work_details" to "anon";

grant references on table "public"."work_details" to "anon";

grant select on table "public"."work_details" to "anon";

grant trigger on table "public"."work_details" to "anon";

grant truncate on table "public"."work_details" to "anon";

grant update on table "public"."work_details" to "anon";

grant delete on table "public"."work_details" to "authenticated";

grant insert on table "public"."work_details" to "authenticated";

grant references on table "public"."work_details" to "authenticated";

grant select on table "public"."work_details" to "authenticated";

grant trigger on table "public"."work_details" to "authenticated";

grant truncate on table "public"."work_details" to "authenticated";

grant update on table "public"."work_details" to "authenticated";

grant delete on table "public"."work_details" to "service_role";

grant insert on table "public"."work_details" to "service_role";

grant references on table "public"."work_details" to "service_role";

grant select on table "public"."work_details" to "service_role";

grant trigger on table "public"."work_details" to "service_role";

grant truncate on table "public"."work_details" to "service_role";

grant update on table "public"."work_details" to "service_role";

grant delete on table "public"."work_images" to "anon";

grant insert on table "public"."work_images" to "anon";

grant references on table "public"."work_images" to "anon";

grant select on table "public"."work_images" to "anon";

grant trigger on table "public"."work_images" to "anon";

grant truncate on table "public"."work_images" to "anon";

grant update on table "public"."work_images" to "anon";

grant delete on table "public"."work_images" to "authenticated";

grant insert on table "public"."work_images" to "authenticated";

grant references on table "public"."work_images" to "authenticated";

grant select on table "public"."work_images" to "authenticated";

grant trigger on table "public"."work_images" to "authenticated";

grant truncate on table "public"."work_images" to "authenticated";

grant update on table "public"."work_images" to "authenticated";

grant delete on table "public"."work_images" to "service_role";

grant insert on table "public"."work_images" to "service_role";

grant references on table "public"."work_images" to "service_role";

grant select on table "public"."work_images" to "service_role";

grant trigger on table "public"."work_images" to "service_role";

grant truncate on table "public"."work_images" to "service_role";

grant update on table "public"."work_images" to "service_role";

grant delete on table "public"."work_responsibilities" to "anon";

grant insert on table "public"."work_responsibilities" to "anon";

grant references on table "public"."work_responsibilities" to "anon";

grant select on table "public"."work_responsibilities" to "anon";

grant trigger on table "public"."work_responsibilities" to "anon";

grant truncate on table "public"."work_responsibilities" to "anon";

grant update on table "public"."work_responsibilities" to "anon";

grant delete on table "public"."work_responsibilities" to "authenticated";

grant insert on table "public"."work_responsibilities" to "authenticated";

grant references on table "public"."work_responsibilities" to "authenticated";

grant select on table "public"."work_responsibilities" to "authenticated";

grant trigger on table "public"."work_responsibilities" to "authenticated";

grant truncate on table "public"."work_responsibilities" to "authenticated";

grant update on table "public"."work_responsibilities" to "authenticated";

grant delete on table "public"."work_responsibilities" to "service_role";

grant insert on table "public"."work_responsibilities" to "service_role";

grant references on table "public"."work_responsibilities" to "service_role";

grant select on table "public"."work_responsibilities" to "service_role";

grant trigger on table "public"."work_responsibilities" to "service_role";

grant truncate on table "public"."work_responsibilities" to "service_role";

grant update on table "public"."work_responsibilities" to "service_role";

grant delete on table "public"."work_results" to "anon";

grant insert on table "public"."work_results" to "anon";

grant references on table "public"."work_results" to "anon";

grant select on table "public"."work_results" to "anon";

grant trigger on table "public"."work_results" to "anon";

grant truncate on table "public"."work_results" to "anon";

grant update on table "public"."work_results" to "anon";

grant delete on table "public"."work_results" to "authenticated";

grant insert on table "public"."work_results" to "authenticated";

grant references on table "public"."work_results" to "authenticated";

grant select on table "public"."work_results" to "authenticated";

grant trigger on table "public"."work_results" to "authenticated";

grant truncate on table "public"."work_results" to "authenticated";

grant update on table "public"."work_results" to "authenticated";

grant delete on table "public"."work_results" to "service_role";

grant insert on table "public"."work_results" to "service_role";

grant references on table "public"."work_results" to "service_role";

grant select on table "public"."work_results" to "service_role";

grant trigger on table "public"."work_results" to "service_role";

grant truncate on table "public"."work_results" to "service_role";

grant update on table "public"."work_results" to "service_role";

grant delete on table "public"."work_skills" to "anon";

grant insert on table "public"."work_skills" to "anon";

grant references on table "public"."work_skills" to "anon";

grant select on table "public"."work_skills" to "anon";

grant trigger on table "public"."work_skills" to "anon";

grant truncate on table "public"."work_skills" to "anon";

grant update on table "public"."work_skills" to "anon";

grant delete on table "public"."work_skills" to "authenticated";

grant insert on table "public"."work_skills" to "authenticated";

grant references on table "public"."work_skills" to "authenticated";

grant select on table "public"."work_skills" to "authenticated";

grant trigger on table "public"."work_skills" to "authenticated";

grant truncate on table "public"."work_skills" to "authenticated";

grant update on table "public"."work_skills" to "authenticated";

grant delete on table "public"."work_skills" to "service_role";

grant insert on table "public"."work_skills" to "service_role";

grant references on table "public"."work_skills" to "service_role";

grant select on table "public"."work_skills" to "service_role";

grant trigger on table "public"."work_skills" to "service_role";

grant truncate on table "public"."work_skills" to "service_role";

grant update on table "public"."work_skills" to "service_role";

grant delete on table "public"."work_solutions" to "anon";

grant insert on table "public"."work_solutions" to "anon";

grant references on table "public"."work_solutions" to "anon";

grant select on table "public"."work_solutions" to "anon";

grant trigger on table "public"."work_solutions" to "anon";

grant truncate on table "public"."work_solutions" to "anon";

grant update on table "public"."work_solutions" to "anon";

grant delete on table "public"."work_solutions" to "authenticated";

grant insert on table "public"."work_solutions" to "authenticated";

grant references on table "public"."work_solutions" to "authenticated";

grant select on table "public"."work_solutions" to "authenticated";

grant trigger on table "public"."work_solutions" to "authenticated";

grant truncate on table "public"."work_solutions" to "authenticated";

grant update on table "public"."work_solutions" to "authenticated";

grant delete on table "public"."work_solutions" to "service_role";

grant insert on table "public"."work_solutions" to "service_role";

grant references on table "public"."work_solutions" to "service_role";

grant select on table "public"."work_solutions" to "service_role";

grant trigger on table "public"."work_solutions" to "service_role";

grant truncate on table "public"."work_solutions" to "service_role";

grant update on table "public"."work_solutions" to "service_role";

grant delete on table "public"."work_technologies" to "anon";

grant insert on table "public"."work_technologies" to "anon";

grant references on table "public"."work_technologies" to "anon";

grant select on table "public"."work_technologies" to "anon";

grant trigger on table "public"."work_technologies" to "anon";

grant truncate on table "public"."work_technologies" to "anon";

grant update on table "public"."work_technologies" to "anon";

grant delete on table "public"."work_technologies" to "authenticated";

grant insert on table "public"."work_technologies" to "authenticated";

grant references on table "public"."work_technologies" to "authenticated";

grant select on table "public"."work_technologies" to "authenticated";

grant trigger on table "public"."work_technologies" to "authenticated";

grant truncate on table "public"."work_technologies" to "authenticated";

grant update on table "public"."work_technologies" to "authenticated";

grant delete on table "public"."work_technologies" to "service_role";

grant insert on table "public"."work_technologies" to "service_role";

grant references on table "public"."work_technologies" to "service_role";

grant select on table "public"."work_technologies" to "service_role";

grant trigger on table "public"."work_technologies" to "service_role";

grant truncate on table "public"."work_technologies" to "service_role";

grant update on table "public"."work_technologies" to "service_role";

grant delete on table "public"."works" to "anon";

grant insert on table "public"."works" to "anon";

grant references on table "public"."works" to "anon";

grant select on table "public"."works" to "anon";

grant trigger on table "public"."works" to "anon";

grant truncate on table "public"."works" to "anon";

grant update on table "public"."works" to "anon";

grant delete on table "public"."works" to "authenticated";

grant insert on table "public"."works" to "authenticated";

grant references on table "public"."works" to "authenticated";

grant select on table "public"."works" to "authenticated";

grant trigger on table "public"."works" to "authenticated";

grant truncate on table "public"."works" to "authenticated";

grant update on table "public"."works" to "authenticated";

grant delete on table "public"."works" to "service_role";

grant insert on table "public"."works" to "service_role";

grant references on table "public"."works" to "service_role";

grant select on table "public"."works" to "service_role";

grant trigger on table "public"."works" to "service_role";

grant truncate on table "public"."works" to "service_role";

grant update on table "public"."works" to "service_role";

create policy "管理者のみ参照可能"
on "public"."admin_users"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM admin_users admin_users_1
  WHERE ((admin_users_1.id = auth.uid()) AND (admin_users_1.is_active = true)))));


create policy "サービスロールのみアクセス可能"
on "public"."admin_users_history"
as permissive
for all
to service_role
using (true);


create policy "監査ログは認証済みユーザーが作成可能"
on "public"."audit_logs"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "カテゴリーは誰でも閲覧可能"
on "public"."blog_categories"
as permissive
for select
to public;


create policy "管理者のみカテゴリーの作成・編集・削除が可"
on "public"."blog_categories"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの記事は誰でも閲覧可能"
on "public"."blog_posts"
as permissive
for select
to public
using ((status = 'published'::text));


create policy "管理者のみ記事の作成・編集・削除が可能"
on "public"."blog_posts"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの記事に紐づくカテゴリーは誰でも閲"
on "public"."blog_posts_categories"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM blog_posts
  WHERE ((blog_posts.id = blog_posts_categories.post_id) AND (blog_posts.status = 'published'::text)))));


create policy "管理者のみ記事とカテゴリーの紐付けの作成・"
on "public"."blog_posts_categories"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable read access for all users"
on "public"."contact_categories"
as permissive
for select
to public
using (true);


create policy "Enable read access for authenticated users"
on "public"."contact_chat_messages"
as permissive
for select
to public
using ((chat_id IN ( SELECT contact_chats.id
   FROM contact_chats
  WHERE (contact_chats.profile_id = auth.uid()))));


create policy "Enable read access for authenticated users"
on "public"."contact_chats"
as permissive
for select
to public
using ((auth.uid() = profile_id));


create policy "Enable update access for authenticated users"
on "public"."contact_chats"
as permissive
for update
to public
using ((auth.uid() = profile_id));


create policy "Email attachments are only visible to authenticated users"
on "public"."email_attachments"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Email attachments can only be deleted by authenticated users"
on "public"."email_attachments"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Email attachments can only be inserted by authenticated users"
on "public"."email_attachments"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Email replies are only visible to authenticated users"
on "public"."email_replies"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Email replies can only be inserted by authenticated users"
on "public"."email_replies"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Email replies can only be updated by authenticated users"
on "public"."email_replies"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Email settings are only visible to authenticated users"
on "public"."email_settings"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Email settings can only be inserted by authenticated users"
on "public"."email_settings"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Email settings can only be updated by authenticated users"
on "public"."email_settings"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Emails are only visible to authenticated users"
on "public"."emails"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Emails can only be inserted by authenticated users"
on "public"."emails"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Emails can only be updated by authenticated users"
on "public"."emails"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "管理者のみ機能の作成・編集・削除が可能"
on "public"."estimate_features"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "見積もりに紐づく機能は誰でも閲覧可能"
on "public"."estimate_features"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM estimates
  WHERE (estimates.id = estimate_features.estimate_id))));


create policy "管理者のみ実装要件の作成・編集・削除が可能"
on "public"."estimate_requirements"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "見積もりに紐づく実装要件は誰でも閲覧可能"
on "public"."estimate_requirements"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM estimates
  WHERE (estimates.id = estimate_requirements.estimate_id))));


create policy "管理者のみ見積もりの閲覧・編集・削除が可能"
on "public"."estimates"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "誰でも見積もりを作成可能"
on "public"."estimates"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."faqs"
as permissive
for select
to public
using (true);


create policy "Enable read access for authenticated users"
on "public"."files"
as permissive
for select
to public
using ((message_id IN ( SELECT contact_chat_messages.id
   FROM contact_chat_messages
  WHERE (contact_chat_messages.chat_id IN ( SELECT contact_chats.id
           FROM contact_chats
          WHERE (contact_chats.profile_id = auth.uid()))))));


create policy "ユーザーは自分のセッションのみ作成可能"
on "public"."focus_sessions"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "ユーザーは自分のセッションのみ参照可能"
on "public"."focus_sessions"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "ユーザーは自分のセッションのみ更新可能"
on "public"."focus_sessions"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "github_contributions_delete_policy"
on "public"."github_contributions"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "github_contributions_insert_policy"
on "public"."github_contributions"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "github_contributions_select_policy"
on "public"."github_contributions"
as permissive
for select
to authenticated
using (true);


create policy "github_contributions_update_policy"
on "public"."github_contributions"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "github_settings_insert_policy"
on "public"."github_settings"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "github_settings_select_policy"
on "public"."github_settings"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "github_settings_update_policy"
on "public"."github_settings"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Gmail credentials are only visible to authenticated users"
on "public"."gmail_credentials"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Gmail credentials can only be deleted by authenticated users"
on "public"."gmail_credentials"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Gmail credentials can only be inserted by authenticated users"
on "public"."gmail_credentials"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Gmail credentials can only be updated by authenticated users"
on "public"."gmail_credentials"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "編集者情報の作成・編集は認証済みユーザーの"
on "public"."knowledge_page_collaborators"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "編集者情報の参照は全員可能"
on "public"."knowledge_page_collaborators"
as permissive
for select
to public
using (true);


create policy "詳細の作成・編集は認証済みユーザーのみ可能"
on "public"."knowledge_page_details"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "詳細の参照は全員可能"
on "public"."knowledge_page_details"
as permissive
for select
to public
using (true);


create policy "リンク情報の作成・編集は認証済みユーザーの"
on "public"."knowledge_page_links"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "リンク情報の参照は全員可能"
on "public"."knowledge_page_links"
as permissive
for select
to public
using (true);


create policy "ページの作成・編集は認証済みユーザーのみ可"
on "public"."knowledge_pages"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "ページの参照は全員可能"
on "public"."knowledge_pages"
as permissive
for select
to public
using (true);


create policy "プロジェクトの作成・編集は認証済みユーザー"
on "public"."knowledge_projects"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "プロジェクトの参照は全員可能"
on "public"."knowledge_projects"
as permissive
for select
to public
using (true);


create policy "同期ログの作成・編集は認証済みユーザーのみ"
on "public"."knowledge_sync_logs"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "同期ログの参照は全員可能"
on "public"."knowledge_sync_logs"
as permissive
for select
to public
using (true);


create policy "ユーザー情報の作成・編集は認証済みユーザー"
on "public"."knowledge_users"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "ユーザー情報の参照は全員可能"
on "public"."knowledge_users"
as permissive
for select
to public
using (true);


create policy "Allow delete for authenticated admin users"
on "public"."metrics"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN roles r ON ((ur.role_id = r.id)))
  WHERE ((ur.user_id = auth.uid()) AND (r.name = 'admin'::text)))));


create policy "Allow insert for authenticated admin users"
on "public"."metrics"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN roles r ON ((ur.role_id = r.id)))
  WHERE ((ur.user_id = auth.uid()) AND (r.name = 'admin'::text)))));


create policy "Allow read access for all users"
on "public"."metrics"
as permissive
for select
to public
using (true);


create policy "Allow update for authenticated admin users"
on "public"."metrics"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN roles r ON ((ur.role_id = r.id)))
  WHERE ((ur.user_id = auth.uid()) AND (r.name = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN roles r ON ((ur.role_id = r.id)))
  WHERE ((ur.user_id = auth.uid()) AND (r.name = 'admin'::text)))));


create policy "システムは通知設定を作成可能"
on "public"."notification_settings"
as permissive
for insert
to service_role
with check (true);


create policy "ユーザーは自分の通知設定のみ参照・更新可能"
on "public"."notification_settings"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "ユーザーは自分の通知設定のみ更新可能"
on "public"."notification_settings"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "システムは通知を作成可能"
on "public"."notifications"
as permissive
for insert
to service_role
with check (true);


create policy "ユーザーは自分の通知のみ参照可能"
on "public"."notifications"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "OTPチャレンジは本人のみが参照可能"
on "public"."otp_challenges"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "OTPチャレンジは本人のみが管理可能"
on "public"."otp_challenges"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "OTP設定は本人のみが参照可能"
on "public"."otp_settings"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "OTP設定は本人のみが管理可能"
on "public"."otp_settings"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "権限は認証済みユーザーが参照可能"
on "public"."permissions"
as permissive
for select
to authenticated
using (true);


create policy "profiles_select_policy"
on "public"."profiles"
as permissive
for select
to authenticated
using ((id = auth.uid()));


create policy "プロファイル作成ポリシー"
on "public"."profiles"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "プロファイル参照ポリシー"
on "public"."profiles"
as permissive
for select
to authenticated
using (true);


create policy "プロファイル更新ポリシー"
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "プロジェクトオーナーはGitHub連携を削除可能"
on "public"."project_github_integrations"
as permissive
for delete
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーはGitHub連携を更新可能"
on "public"."project_github_integrations"
as permissive
for update
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーはGitHub連携を設定可能"
on "public"."project_github_integrations"
as permissive
for insert
to public
with check ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトメンバーはGitHub連携情報を参照可"
on "public"."project_github_integrations"
as permissive
for select
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーはマイルストーンを作成"
on "public"."project_milestones"
as permissive
for insert
to public
with check ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーはマイルストーンを削除"
on "public"."project_milestones"
as permissive
for delete
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーはマイルストーンを更新"
on "public"."project_milestones"
as permissive
for update
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトメンバーはマイルストーンを参照"
on "public"."project_milestones"
as permissive
for select
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーは進捗ログを削除可能"
on "public"."project_progress_logs"
as permissive
for delete
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトオーナーは進捗ログを更新可能"
on "public"."project_progress_logs"
as permissive
for update
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトメンバーは進捗ログを作成可能"
on "public"."project_progress_logs"
as permissive
for insert
to public
with check ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "プロジェクトメンバーは進捗ログを参照可能"
on "public"."project_progress_logs"
as permissive
for select
to public
using ((project_id IN ( SELECT projects.id
   FROM projects
  WHERE (projects.user_id = auth.uid()))));


create policy "ユーザーは自分のプロジェクトのみ作成可能"
on "public"."projects"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "ユーザーは自分のプロジェクトのみ参照可能"
on "public"."projects"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "ユーザーは自分のプロジェクトのみ更新可能"
on "public"."projects"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "監査ログの挿入"
on "public"."role_audit_logs"
as permissive
for insert
to authenticated
with check (true);


create policy "監査ログは管理者のみ参照可能"
on "public"."role_audit_logs"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM admin_users_view
  WHERE (admin_users_view.user_id = auth.uid()))));


create policy "ロール権限は認証済みユーザーが参照可能"
on "public"."role_permissions"
as permissive
for select
to authenticated
using (true);


create policy "システムロールは管理者のみ参照可能"
on "public"."roles"
as permissive
for select
to authenticated
using (((type = 'system'::text) AND (EXISTS ( SELECT 1
   FROM admin_users_view
  WHERE (admin_users_view.user_id = auth.uid())))));


create policy "一般ロールは全員参照可能"
on "public"."roles"
as permissive
for select
to authenticated
using ((type = 'user'::text));


create policy "全ユーザーが設定を閲覧可能"
on "public"."site_settings"
as permissive
for select
to public
using (true);


create policy "管理者のみが設定を編集可能"
on "public"."site_settings"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'admin'::text));


create policy "カテゴリーの作成・編集は認証済みユーザーの"
on "public"."skill_categories"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "カテゴリーの参照は全員可能"
on "public"."skill_categories"
as permissive
for select
to public
using (true);


create policy "関連の作成・編集は認証済みユーザーのみ可能"
on "public"."skill_category_relations"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "関連の参照は全員可能"
on "public"."skill_category_relations"
as permissive
for select
to public
using (true);


create policy "実績の作成・編集は認証済みユーザーのみ可能"
on "public"."skill_experiences"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "実績の参照は全員可能"
on "public"."skill_experiences"
as permissive
for select
to public
using (true);


create policy "機能説明の作成・編集は認証済みユーザーのみ"
on "public"."skill_features"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "機能説明の参照は全員可能"
on "public"."skill_features"
as permissive
for select
to public
using (true);


create policy "スキルの作成・編集は認証済みユーザーのみ可"
on "public"."skills"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "スキルの参照は全員可能"
on "public"."skills"
as permissive
for select
to public
using (true);


create policy "Service role can manage all sync errors"
on "public"."sync_errors"
as permissive
for all
to public
using (((auth.jwt() ->> 'role'::text) = 'service_role'::text));


create policy "Users can view their own sync errors"
on "public"."sync_errors"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "ユーザーは自分のプロジェクトに属するタスク"
on "public"."tasks"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = tasks.project_id) AND (projects.user_id = auth.uid())))));


create policy "技術スタックは誰でも閲覧可能"
on "public"."technologies"
as permissive
for select
to public;


create policy "管理者のみ技術スタックの作成・編集・削除が"
on "public"."technologies"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "信頼済みデバイスは本人のみが参照可能"
on "public"."trusted_devices"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "信頼済みデバイスは本人のみが管理可能"
on "public"."trusted_devices"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "ロール削除は管理者のみ可能"
on "public"."user_roles"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM admin_users_view
  WHERE (admin_users_view.user_id = auth.uid()))));


create policy "ロール割り当ては管理者のみ可能"
on "public"."user_roles"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM admin_users_view
  WHERE (admin_users_view.user_id = auth.uid()))));


create policy "自分のロールのみ参照可能"
on "public"."user_roles"
as permissive
for select
to authenticated
using (((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admin_users_view
  WHERE (admin_users_view.user_id = auth.uid())))));


create policy "公開済みの実績の課題は誰でも閲覧可能"
on "public"."work_challenges"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_challenges.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ課題の作成・編集・削除が可能"
on "public"."work_challenges"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績の詳細は誰でも閲覧可能"
on "public"."work_details"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_details.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ詳細情報の作成・編集・削除が可能"
on "public"."work_details"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績の画像は誰でも閲覧可能"
on "public"."work_images"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_images.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ画像の作成・編集・削除が可能"
on "public"."work_images"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績の担当業務は誰でも閲覧可能"
on "public"."work_responsibilities"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_responsibilities.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ担当業務の作成・編集・削除が可能"
on "public"."work_responsibilities"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績の成果は誰でも閲覧可能"
on "public"."work_results"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_results.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ成果の作成・編集・削除が可能"
on "public"."work_results"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "管理者のみ作成・編集・削除が可能"
on "public"."work_skills"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績の解決策は誰でも閲覧可能"
on "public"."work_solutions"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_solutions.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ解決策の作成・編集・削除が可能"
on "public"."work_solutions"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績に紐づく技術は誰でも閲覧可能"
on "public"."work_technologies"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM works
  WHERE ((works.id = work_technologies.work_id) AND (works.status = 'published'::text)))));


create policy "管理者のみ実績と技術の紐付けの作成・削除が"
on "public"."work_technologies"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "公開済みの実績は誰でも閲覧可能"
on "public"."works"
as permissive
for select
to public
using ((status = 'published'::text));


create policy "管理者のみ実績の作成・編集・削除が可能"
on "public"."works"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


CREATE TRIGGER log_admin_changes AFTER INSERT OR DELETE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION log_admin_user_changes();

CREATE TRIGGER set_published_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION set_published_at_on_publish();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_estimate_total_cost AFTER INSERT OR DELETE OR UPDATE ON public.estimate_features FOR EACH ROW EXECUTE FUNCTION update_estimate_total_cost();

CREATE TRIGGER update_estimate_requirements_updated_at BEFORE UPDATE ON public.estimate_requirements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER calculate_total_cost BEFORE INSERT OR UPDATE ON public.estimates FOR EACH ROW EXECUTE FUNCTION calculate_total_cost();

CREATE TRIGGER update_estimates_updated_at BEFORE UPDATE ON public.estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_github_contributions_updated_at BEFORE UPDATE ON public.github_contributions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_page_details_updated_at BEFORE UPDATE ON public.knowledge_page_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_projects_updated_at BEFORE UPDATE ON public.knowledge_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_users_updated_at BEFORE UPDATE ON public.knowledge_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.notification_settings FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER update_otp_challenges_updated_at BEFORE UPDATE ON public.otp_challenges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_otp_settings_updated_at BEFORE UPDATE ON public.otp_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON public.permissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_github_integrations_updated_at BEFORE UPDATE ON public.project_github_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_milestones_updated_at BEFORE UPDATE ON public.project_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_last_activity_trigger BEFORE UPDATE ON public.projects FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION update_project_last_activity();

CREATE TRIGGER update_role_policies_updated_at BEFORE UPDATE ON public.role_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_policies_updated_at BEFORE UPDATE ON public.session_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_categories_updated_at BEFORE UPDATE ON public.skill_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_experiences_updated_at BEFORE UPDATE ON public.skill_experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_features_updated_at BEFORE UPDATE ON public.skill_features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technologies_updated_at BEFORE UPDATE ON public.technologies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trusted_devices_updated_at BEFORE UPDATE ON public.trusted_devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER user_roles_audit AFTER INSERT OR DELETE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION log_role_changes();

CREATE TRIGGER update_work_challenges_updated_at BEFORE UPDATE ON public.work_challenges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_details_updated_at BEFORE UPDATE ON public.work_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_images_updated_at BEFORE UPDATE ON public.work_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_responsibilities_updated_at BEFORE UPDATE ON public.work_responsibilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_results_updated_at BEFORE UPDATE ON public.work_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_solutions_updated_at BEFORE UPDATE ON public.work_solutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON public.works FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


