ActiveAdmin.register Video do
  permit_params :title,
                :url,
                :description,
                :last_season,
                :last_episod

  index do
    selectable_column
    id_column
    column :title
    column :url
    column :last_season
    column :last_episod
    column :description
    actions
  end

  filter :title
  filter :url
  filter :description

  form do |f|
    f.inputs "Video Details" do
      f.input :title
      f.input :url
      f.input :description
      f.input :last_season
      f.input :last_episod
    end
    f.actions
  end
end
