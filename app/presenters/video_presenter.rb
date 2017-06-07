class VideoPresenter
  def initialize(controller, params)
    @controller = controller
    @params = params
  end

  def transform_all(videos)
    videos.map(&method(:transform))
  end

  def transform(video)
    if action?('index') || action?('search')
      return video.as_json(only: [:id, :title]).merge(
        action: list_files_for?(video) ? :list_files : :list_directories,
        directory_path: "/#{video['id']}",
        label: video['title'],
        name: "video_#{video['id']}",
        thumb: image_url('videolist.jpg')
      )
    end

    if action?('show') && list_files_for?(video)
      video_files(video).as_json(only: [:id, :title, :url]).map do |f|
        f.merge(
          action: :play,
          video_file_url: f['url'].gsub(/fi2lm\/.*\//, "fi2lm/#{SecureMark.first.seasonvar_value}/"),
          label: f['title'],
          name: "video_file_#{f['id']}",
          thumb: image_url('videolist.jpg')
        )
      end
    else
      (1..video.last_season).map do |season|
        {
          action: :list_files,
          directory_path: "/#{video['id']}?season=#{season}",
          label: "Сезон #{season}",
          name: "video_#{video['id']}_season_#{season}",
          thumb: image_url('videolist.jpg')
        }
      end
    end
  end

  private def action?(action_name)
    @controller.send(:action_name) == action_name
  end

  private def list_files_for?(video)
    video.last_season == 1 || @params[:season].present?
  end

  private def image_url(*variables)
    @controller.send(:image_url, *variables)
  end

  private def video_files(video)
    video_files ||= begin
      result = video.video_files
      result = result.where(season: @params[:season]) if @params[:season].present?
      result
    end
  end

  def self.default_directories
    [
      {
        action: :list_directories,
        directory_path: '/search',
        label: :Search,
        name: :search,
        thumb: 'videolist.jpg'
      },
      {
        action: :list_directories,
        directory_path: '/',
        label: 'All videos',
        name: :all_videos,
        thumb: 'videolist.jpg'
      }
    ]
  end
end
