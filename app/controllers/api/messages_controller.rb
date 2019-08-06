class Api::MessagesController < ApplicationController
  def index
    @group=Group.find(params[:id])
    @messages = @group.messages.where('id > ?', params[:id] )}
    end
  end
end