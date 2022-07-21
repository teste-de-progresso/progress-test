class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :subject, null: true, foreign_key: true
      t.jsonb :alternatives, null: false, default: []
      t.string :authorship
      t.string :authorship_year
      t.string :bloom_taxonomy
      t.text :body
      t.string :check_type
      t.string :difficulty
      t.text :explanation
      t.text :instruction
      t.text :intention
      t.text :references
      t.string :status, null: false, default: 'draft'
      t.text :support

      t.timestamps
    end
  end
end
