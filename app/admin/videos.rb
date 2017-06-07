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

    actions defaults: true do |video|
      link_to I18n.t(:fetch), fetch_admin_video_path(video)
    end
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

  show do
    attributes_table do
      row :id
      row :title
      row :url
      row :last_season
      row :last_episod
      row :description
    end

    if resource.video_files.size > 0
      panel 'Video Files' do
        table_for resource.video_files do
          column :id
          column :title
          column :url
          column :season
          column :episod
        end
      end
    end
  end

  action_item :fetch, only: :show do
    link_to I18n.t(:fetch), fetch_admin_video_path(video)
  end

  member_action :fetch, method: :get do
    SeasonVarFetcher.new(resource).execute

    redirect_to action: :show, id: resource.id
  end
end
