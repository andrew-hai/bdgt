class VideoFile < ApplicationRecord
  belongs_to :video

  validates_presence_of :title, :url, :season, :episod, :video
end
