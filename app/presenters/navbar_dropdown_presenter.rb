class NavbarDropdownPresenter
  def self.fund_changes
    FundChange.includes(:fund).order('id DESC').limit(3)
  end
end
