ActiveAdmin.register Audio do
  permit_params :artist,
                :title,
                :album,
                :year,
                :track_number,
                :genre,
                :duration,
                :file

  config.sort_order = 'title_asc'

  index do
    selectable_column
 
    id_column

    column :artist
    column :title
    column :album
    column :year
    column :track_number
    column :genre
    column :duration

    actions
  end

  filter :artist
  filter :title
  filter :album
  filter :year
  filter :track_number
  filter :genre
  filter :duration
end
