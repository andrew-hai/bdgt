module CostCategoriesHelper
  def progress_bar_class(progress)
    case progress
    when progress <= 25 then 'progress-bar-success'
    when progress <= 50 then 'progress-bar-info'
    when progress <= 75 then 'progress-bar-warning'
    when progress <= 100 then 'progress-bar-danger'
    end
  end
end
