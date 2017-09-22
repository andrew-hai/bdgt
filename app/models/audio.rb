class Audio < ApplicationRecord
  has_attached_file :file, {
    url: "/audios/:hash.:extension",
    hash_secret: "longSecretStringlongSecretStringlongSecretStringlongSecretString"
  }
  validates_attachment_content_type :file, content_type: ["audio/mp3"]

  def file_url
    ActionController::Base.helpers.image_url(file.url)
  end
end
