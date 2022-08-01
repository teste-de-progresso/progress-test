module Trashable
  extend ActiveSupport::Concern

  included do
    default_scope { where(deleted_at: nil) }
  end

  module ClassMethods
    def trashed
      self.unscoped.where(self.arel_table[:deleted_at].not_eq(nil))
    end
  end

  def destroy
    update_column :deleted_at, Time.now
  end

  def recover
    update_attribute :deleted_at, nil
  end
end