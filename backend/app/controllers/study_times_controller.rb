class StudyTimesController < ApplicationController
  def show
    study_times = StudyTime.where(user_id: params[:id])
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

    render json: { study_time: "#{hours}時間#{minutes}分" }
  end
end
