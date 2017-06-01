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
            query_field = key.to_s.gsub(/_from\z/, '').gsub(/_to\z/, '')
            scope = scope.where(
              query_string(options[:query_type], query_field),
              value: query_value(options[:query_type], filter_value)
            )
          end
        end

        query.sum_amount = scope.sum(:amount) if query.any_filter?

        query.results = scope.per_page_kaminari(params[:page])
      end
    end

    def filters
      @filters ||= {}
    end

    private def query_string(query_type, query_field)
      case query_type
      when :full_like then "#{query_field} LIKE(:value)"
      when :'=', :'<=', :'>=' then "#{query_field} #{query_type} :value"
      else "#{query_field} = :value"
      end
    end

    private def query_value(query_type, filter_value)
      case query_type
      when :full_like then "%#{filter_value}%"
      else filter_value
      end
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
    self.class.filters.keys.map{ |key| public_send(key) }.any?{ |filter| filter.present? }
  end
end
