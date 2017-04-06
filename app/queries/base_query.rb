class BaseQuery
  class << self
    attr_accessor :base_scope

    def perform(params)
      scope = base_scope

      @filters.each do |k, v|
        if params[params_group].try(:[], k).present?
          case v[:type]
          when :like
            like_str = "%#{params[params_group][k]}%"
            scope = scope.where("#{k} LIKE(:like_str)", like_str: like_str)
          else
            scope = scope.where(k => params[params_group][k])
          end
        end
      end

      scope.page(params[:page])
    end

    private def filter(name, options = {})
      @filters[name] = options
    end

    private def params_group
      @params_group ||= name.underscore.gsub('_query', '').to_sym
    end
  end
end
