class NavbarDropdownPresenter
  def self.fund_changes
    @fund_changes ||= begin
      FundChange.order('id DESC').limit(3)
    end
  end
end
