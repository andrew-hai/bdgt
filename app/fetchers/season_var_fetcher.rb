# Use the class methods to get down to business quickly
# response = HTTParty.get('http://api.stackexchange.com/2.2/questions?site=stackoverflow')
# puts response.body, response.code, response.message, response.headers.inspect

# var data4play = {\n" +
# "      'secureMark': '36e598555d6beb9610e51b9e3261399b',\n" +
# "      'time': 1496765882\n" +
# "    }\n" +
# work secureMark': '36e598555d6beb9610e51b9e3261399b

class SeasonVarFetcher
  attr_reader :video

  def initialize(video)
    @video = video
  end

  def execute
    video.video_files.destroy_all

    seasons_urls.each_with_index do |season_url, i|
      video.last_season = i + 1

      begin
        serial_id = season_url.match(/serial-(\d*)-/)[1]
        season_page = HTTParty.get(season_url).body
        secure_mark = season_page.match(/'secureMark': '([0-9a-z]*)'/)[1]

        playlist = season_playlist(serial_id, secure_mark)
        playlist.each_with_index do |episod, j|
          video.last_episod = j + 1

          video.video_files.create(
            title: episod['comment'],
            url: episod['file'],
            season: video.last_season,
            episod: video.last_episod
          )
        end
      rescue => error
        # Some logger
      end
    end

    video.save
  end

  def seasons_urls
    @seasons_urls ||= begin
      document = Nokogiri::HTML(HTTParty.get(video.url).body)
      document.css('.pgs-seaslist li.act a').map { |sl| "http://seasonvar.ru#{sl.attributes['href'].value}" }
    end
  end

  def season_playlist(serial_id, secure_mark)
    pl_url = "http://seasonvar.ru/playls2/#{secure_mark}0/trans/#{serial_id}/list.xml"
    JSON.parse(HTTParty.get(pl_url).body)['playlist']
  end
end
