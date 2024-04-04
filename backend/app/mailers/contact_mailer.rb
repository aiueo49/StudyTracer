class ContactMailer < ApplicationMailer
  def contact_email(contact)
    @contact = contact

    mail(to: 'ilikeski2008@gmail.com', subject: '新しいお問い合わせ')
  end
end
