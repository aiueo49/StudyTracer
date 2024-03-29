class UsersController < ApplicationController
  def show
    @user = User.find_by(token: params[:token])
    # デバッグでbinding.pryを使うために追加予定
    if @user
      # ユーザーが見つかった場合、そのユーザーのページをJSONとして返す
      render json: @user
      # トークンをデータベースから削除する
      # @user.update(token: nil)
    else
      # ユーザーが見つからなかった場合、エラーメッセージを含むJSONを返す
      render json: { error: 'ユーザーが見つかりません' }, status: :not_found
    end
  end
end
