class Category < ApplicationRecord
  validates :category, presence: true, uniqueness: { case_sensitive: false }
end
