require 'open-uri'
require 'json'
require 'nokogiri'

Fipi_index = 'http://fipi.ru'
Fipi_root = 'http://ege.fipi.ru/os11/xmodules/qprint/'
Fipi_images = 'http://ege.fipi.ru/os11/docs/'

class AdminController < ApplicationController

  def parse_page(url, headers = nil)
    puts url
    puts open(url, headers).read
    puts headers.inspect
    Nokogiri.parse(open(url, headers).read)
  end

  def retrieve_picture_urls(str)
    matches = (str.scan /ShowPictureQ\('docs\/([a-zA-Z\/()0-9_\.]+)'\)/).map { |match|
      match[0]
    }
    matches = matches[0] if matches.length == 1
    matches = nil if matches.length.zero?

    matches
  end

  def parse_task(task)
    full_task = task.reduce(:+)
    if full_task.include? 'Task 1' then
        return {
                'type': 1,
                'data': task[1].strip
               }
    elsif full_task.include? 'Task 2' then
        promo = 2
        problem = 1
        if not retrieve_picture_urls(task[promo]).nil?
          promo = 1
          problem = 3
        end
        return {
                'type': 2,
                'questions': task[4..8].map {|q| q.strip }.join("\n"),
                'promo': task[promo].strip,
                'problem': (' ' + task[problem].split('and now')[0]).split('You are considering')[1].strip,
                'img': retrieve_picture_urls(full_task)
               }
    elsif full_task.include? 'Task 3' then
        return {
                'type': 3,
                'imgs': retrieve_picture_urls(full_task)
               }
    else #if includes 'Task 4'
        return {
                'type': 4,
                'question': task[4].gsub('·', '').split('say which')[1].strip,
                'imgs': retrieve_picture_urls(full_task)
               }
    end
  end

  def update_db_with(task)
      if task.type == 1

      elsif task.type == 2

      elsif task.type == 3

      else #if task.type == 4

      end
  end

  def retrieve_tasks
    headers = {
        "Host"=>"ege.fipi.ru",
        "User-Agent"=>"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
        "Accept"=>"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language"=>"en-US,en;q=0.5",
        "Accept-Encoding"=>"gzip, deflate",
        "Connection"=>"keep-alive",
        "DNT"=>"1",
        "Upgrade-Insecure-Requests"=>"1",
        "Cache-Control"=>"max-age=0"
   }

   # '{"Host": "ege.fipi.ru"
   # "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0"
   # "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   # "Accept-Language": "en-US,en;q=0.5"
   # "Accept-Encoding": "gzip, deflate"
   # "DNT": 1
   # "Connection": "keep-alive"
   # "Upgrade-Insecure-Requests": 1}'

    #session_id =  JSON.parse(open(Fipi_index, headers).read)['set-cookie']
    cookie =  open(Fipi_index, headers).meta['set-cookie']

    headers["cookie"] = cookie
    headers["Referer"] = Fipi_root + 'index.php?theme_guid=a49c0b6a9641e3119b00001fc68344c9&proj_guid=4B53A6CB75B0B5E1427E596EB4931A2A'

    data = []

    raw_data =  parse_page(headers["Referer"], headers)
    pages_url =  raw_data.css('span[class=Walk] a').map {|link| link.attributes['href'].content}
    pages_url.each { |href|
      page = parse_page(Fipi_root + href, headers)
      tasks = page.css('form[name=checkform]')
      tasks.each { |task|
        task = task.css('table tr td p')
        task = task.map { |node| node.content }.delete_if {|text| text.blank?}
        update_db_with(parse_task(task))
        data.push(parse_task(task))
      }
    }

    render json: data
  end
end
