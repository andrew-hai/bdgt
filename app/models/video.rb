class Video < ApplicationRecord
  has_many :video_files, inverse_of: :video, dependent: :destroy

  validates_presence_of :title, :url
end
