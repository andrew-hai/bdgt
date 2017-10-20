ActiveAdmin.register Audio do
  permit_params :artist,
                :title,
                :album,
                :year,
                :track_number,
                :genre,
                :content,
                :content2,
                :language,
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
    column :content
    column :content2
    column :language

    actions
  end

  filter :artist
  filter :title
  filter :album
  filter :year
  filter :track_number
  filter :genre
  filter :content
  filter :content2
  filter :language
end
