class ContactsController < ApplicationController

  def create
    @contact = Contact.new(contact_params)

    if @contact.valid?
      ContactMailer.with(contact: { name: @contact.name, email: @contact.email, message: @contact.message }).contact_email.deliver_later
      render json: { message: 'お問い合わせを受け付けました' }, status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
