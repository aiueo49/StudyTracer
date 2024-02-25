# class StudyTimesController < ApplicationController
#   def show
#     study_times = StudyTime.where(user_id: params[:id])
#     total_study_time = 0

#     study_times.each do |record|
#       if record.end_time.present? && record.start_time.present?
#         study_time = (record.end_time - record.start_time) / 3600
#         total_study_time += study_time
#       end
#     end

#     # 小数点以下を切り捨てて、時間と分に分ける
#     hours = total_study_time.floor
#     minutes = ((total_study_time - hours) * 60).round

#     render json: { study_time: "#{hours}時間#{minutes}分" }
#   end
# end

class StudyTimesController < ApplicationController
  def show
    # 今までの合計勉強時間を取得する
    total_study_times = StudyTime.where(user_id: params[:id])
    total_study_time = calculate_study_time(total_study_times)

    # 今日の合計学習時間を取得する
    today_study_times = StudyTime.where(user_id: params[:id], start_time: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
    today_study_time = calculate_study_time(today_study_times)

    # 今週の合計学習時間を取得する
    this_week_study_times = StudyTime.where(user_id: params[:id], start_time: Time.zone.now.beginning_of_week..Time.zone.now.end_of_week)
    this_week_study_time = calculate_study_time(this_week_study_times)

    # 先週の合計学習時間を取得する
    last_week_study_times = StudyTime.where(user_id: params[:id], start_time: Time.zone.now.prev_week.beginning_of_week..Time.zone.now.prev_week.end_of_week)
    last_week_study_time = calculate_study_time(last_week_study_times)

    render json: { total_study_time: total_study_time, today_study_time: today_study_time, this_week_study_time: this_week_study_time, last_week_study_time: last_week_study_time }
  end

  def show_by_date
    study_times = StudyTime.where(user_id: params[:id], start_time: params[:date].to_date.beginning_of_day..params[:date].to_date.end_of_day)
    study_time = calculate_study_time(study_times)
    render json: { study_time: study_time }
  end

  private

  def calculate_study_time(study_times)
    total_study_time = 0

    study_times.each do |record|
      if record.end_time.present? && record.start_time.present?
        study_time = (record.end_time - record.start_time) / 3600
        total_study_time += study_time
      end
    end

    # 小数点以下を切り捨てて、時間と分に分ける
    hours = total_study_time.floor
    minutes = ((total_study_time - hours) * 60).round

    "#{hours}時間#{minutes}分"
  end
end
