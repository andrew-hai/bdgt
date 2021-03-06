ActiveAdmin.register User do
  permit_params :email, :admin, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :email
    column :username
    column :admin
    column :created_at
    actions
  end

  filter :username
  filter :email
  filter :created_at

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :admin
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
