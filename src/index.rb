# Runtime: Ruby 3.2

def handler(event:, context:)
  testEnvVar = ENV['TEST_VALUE']

  puts "Env var: #{testEnvVar}"
  puts event

  response = {
    'msg': 'Hello, world!'
  }

  puts response
  return response
end
