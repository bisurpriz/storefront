interface TabsProps {
  tabs: TabProps[];
  bordered?: boolean;
  onTabChange?: (tab: TabProps) => void;
  /**
   *  Seçili gelmesini istediğiniz tab ID.
   *  Tab ID'leri tab objelerindeki id prop'una eşit olmalıdır.
   *  Yalnız activeTab gönderilirse başlangıçta seçili tab olur.
   *  Eğer bu prop gönderilmezse ilk tab seçili gelir.
   *  onTabChange fonksiyonu gönderilirse tab dışardan kontrol edilir, gönderilmezse tab kendi içinde kontrol edilir.
   *  @default tabs[0].id
   */
  activeTab?: TabProps['id'];
}

interface TabProps {
  label: string;
  content: React.ReactNode;
  id: string;
}
