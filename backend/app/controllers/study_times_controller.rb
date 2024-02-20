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

    render json: { study_time: total_study_time }
  end
end
