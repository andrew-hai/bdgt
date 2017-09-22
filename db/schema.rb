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

ActiveRecord::Schema.define(version: 20170803153058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audios", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.string "file_file_name"
    t.string "file_content_type"
    t.integer "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cost_categories", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "month_limit", default: 2000
  end

  create_table "costs", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "amount"
    t.text "description"
    t.date "spent_on"
    t.integer "user_id"
    t.integer "cost_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cost_category_id"], name: "index_costs_on_cost_category_id"
    t.index ["user_id"], name: "index_costs_on_user_id"
  end

  create_table "fund_changes", id: :serial, force: :cascade do |t|
    t.integer "amount"
    t.integer "fc_type"
    t.integer "fund_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "from"
    t.integer "to"
    t.index ["fund_id"], name: "index_fund_changes_on_fund_id"
  end

  create_table "funds", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "currency"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "amount"
  end

  create_table "incomes", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "amount"
    t.text "description"
    t.date "got_on"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_incomes_on_user_id"
  end

  create_table "secure_marks", force: :cascade do |t|
    t.string "seasonvar_value"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "video_files", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "url", null: false
    t.integer "video_id"
    t.integer "season", default: 1, null: false
    t.integer "episod", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["video_id"], name: "index_video_files_on_video_id"
  end

  create_table "videos", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "url", null: false
    t.text "description", null: false
    t.integer "last_season", default: 1, null: false
    t.integer "last_episod", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
