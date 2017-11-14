class Audio < ApplicationRecord
  has_attached_file :file, {
    url: '/audios/:hash.:extension',
    hash_secret: 'longSecretStringlongSecretStringlongSecretStringlongSecretString'
  }
  validates_attachment_content_type :file, content_type: [
    'audio/mp3',
    ['audio/mp3'],
    'audio/mpeg',
    'audio/flac',
    'audio/x-flac'
  ]

  def as_json(options = {})
    super.tap do |result|
      result[:file_url] = file_url
      result[:img] = img
      result[:durationStr] = "#{duration / 60}:" << "%02d" % (duration % 60)
    end
  end

  def file_url
    ActionController::Base.helpers.image_url(file.url)
  end

  def img
    ActionController::Base.helpers.image_url("music_cover#{[4,5].sample}.png")
  end
end
