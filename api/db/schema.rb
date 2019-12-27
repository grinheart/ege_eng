# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_19_230836) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

# Could not dump table "invitations" because of following StandardError
#   Unknown type 'has_one' for column 'teacher'

  create_table "invites", force: :cascade do |t|
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pics", force: :cascade do |t|
    t.string "filename"
    t.string "content_type"
    t.binary "data"
  end

# Could not dump table "students" because of following StandardError
#   Unknown type 'has_one' for column 'teacher'

  create_table "table_task1s", force: :cascade do |t|
    t.string "text"
  end

  create_table "task1s", force: :cascade do |t|
    t.string "text"
  end

  create_table "task2s", force: :cascade do |t|
    t.string "questions"
    t.string "promo"
    t.string "problem"
  end

  create_table "task3s", force: :cascade do |t|
  end

  create_table "task4s", force: :cascade do |t|
    t.string "question"
  end

  create_table "task_records", force: :cascade do |t|
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "key"
    t.string "s_key"
    t.integer "task_id"
  end

  create_table "task_series", force: :cascade do |t|
    t.string "key"
    t.integer "task_series_id"
  end

# Could not dump table "teachers" because of following StandardError
#   Unknown type 'has_many' for column 'invitations'

end
