class CkEditorUploadsController < ApplicationController
  def create
    @upload = CkEditorUpload.new(attachment: params[:attachment])

    if @upload.save!
      render(json: {
        uploaded: true,
        url: rails_blob_url(@upload.attachment, only_path: false),
      })
    else
      render(json: { uploaded: false })
    end
  end
end
