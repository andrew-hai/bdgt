ActiveAdmin.register VideoFile do
  permit_params :title, :url, :video_id, :season, :episod

  index do
    selectable_column
    id_column
    column :title
    column :url
    column :video
    column :season
    column :episod
    actions
  end

  filter :title
  filter :url
  filter :video
  filter :season
  filter :episod

  form do |f|
    f.inputs "Video File Details" do
      f.input :title
      f.input :url
      f.input :video
      f.input :season
      f.input :episod
    end
    f.actions
  end

end
