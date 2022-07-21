class CreateJoinTableUserRole < ActiveRecord::Migration[7.0]
  def change
    create_join_table(:users, :roles, unique: true) do |t|
      t.index(%i[user_id role_id])
      t.index(%i[role_id user_id])
    end
  end
end
