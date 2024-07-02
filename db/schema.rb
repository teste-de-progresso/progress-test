# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_05_145916) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "assessments", force: :cascade do |t|
    t.string "title"
    t.text "observations"
    t.jsonb "params"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_assessments_on_user_id"
  end

  create_table "axes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_axes_on_name", unique: true
  end

  create_table "ck_editor_uploads", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "subject_id"
    t.jsonb "alternatives", default: [], null: false
    t.string "authorship"
    t.string "authorship_year"
    t.string "bloom_taxonomy"
    t.text "body"
    t.string "check_type"
    t.string "difficulty"
    t.text "explanation"
    t.text "instruction"
    t.text "intention"
    t.text "references"
    t.string "status", default: "draft", null: false
    t.text "support"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["subject_id"], name: "index_questions_on_subject_id"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "review_messages", force: :cascade do |t|
    t.string "feedback_type"
    t.string "content"
    t.bigint "question_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_review_messages_on_question_id"
    t.index ["user_id"], name: "index_review_messages_on_user_id"
  end

  create_table "review_requests", force: :cascade do |t|
    t.string "answered"
    t.bigint "question_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_review_requests_on_question_id"
    t.index ["user_id"], name: "index_review_requests_on_user_id"
  end

  create_table "roles_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.index ["role_id", "user_id"], name: "index_roles_users_on_role_id_and_user_id"
    t.index ["user_id", "role_id"], name: "index_roles_users_on_user_id_and_role_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name"
    t.bigint "axis_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["axis_id"], name: "index_subjects_on_axis_id"
    t.index ["name"], name: "index_subjects_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_url"
    t.string "roles", default: [], array: true
    t.datetime "deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "assessments", "users"
  add_foreign_key "questions", "subjects"
  add_foreign_key "questions", "users"
  add_foreign_key "review_messages", "questions"
  add_foreign_key "review_messages", "users"
  add_foreign_key "review_requests", "questions"
  add_foreign_key "review_requests", "users"
  add_foreign_key "subjects", "axes"
end
