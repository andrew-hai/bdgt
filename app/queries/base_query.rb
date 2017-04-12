class BaseQuery
  attr_accessor :results, :sum_amount

  delegate :total_count, to: :results

  class << self
    def perform(params = {})
      new.tap do |query|
        scope = @base_scope

        filters.each do |key, options|
          filter_value = query.public_send("#{key}=", params.dig(params_group, key))
          if filter_value.present?
            case options[:query_type]
            when :full_like
              scope = scope.where("#{key} LIKE(:value)", value: "%#{filter_value}%")
            when :gth
              scope = scope.where("#{key.to_s.gsub('_from', '')} >= :value", value: filter_value)
            when :lth
              scope = scope.where("#{key.to_s.gsub('_to', '')} <= :value", value: filter_value)
            else
              scope = scope.where(key => filter_value)
            end
          end
        end

        if query.any_filter?
          query.sum_amount = scope.sum(:amount)
        end

        query.results = scope.page(params[:page])
      end
    end

    def filters
      @filters ||= {}
    end

    private def base_scope(scope)
      @base_scope = scope
    end

    private def filter(name, options = {})
      filters[name] = options
      module_eval { attr_accessor name }
    end

    private def params_group
      @params_group ||= name.underscore.gsub('_query', '').to_sym
    end
  end

  def any_filter?
    self.class.filters.keys.map{ |key| public_send(key) }.any?{ |f| f.present? }
  end
end
