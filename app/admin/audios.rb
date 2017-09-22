ActiveAdmin.register Audio do
  permit_params :name, :author, :file

  config.sort_order = 'author_asc'

  index do
    selectable_column
    id_column
    column :name
    column :author
    column :file
    actions
  end

  filter :name
  filter :author

  form do |f|
    f.inputs "Audio Details" do
      f.input :name
      f.input :author
      f.input :file
    end
    f.actions
  end

end
