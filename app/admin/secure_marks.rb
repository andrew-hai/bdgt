ActiveAdmin.register SecureMark do
  permit_params :seasonvar_value

  index do
    selectable_column
    id_column
    column :seasonvar_value

    actions
  end

  filter :seasonvar_value

  form do |f|
    f.inputs "Video Details" do
      f.input :seasonvar_value
    end
    f.actions
  end
end
