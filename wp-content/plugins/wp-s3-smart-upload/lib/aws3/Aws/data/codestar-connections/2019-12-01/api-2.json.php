<?php

// This file was auto-generated from sdk-root/src/data/codestar-connections/2019-12-01/api-2.json
return ['version' => '2.0', 'metadata' => ['apiVersion' => '2019-12-01', 'endpointPrefix' => 'codestar-connections', 'jsonVersion' => '1.0', 'protocol' => 'json', 'serviceFullName' => 'AWS CodeStar connections', 'serviceId' => 'CodeStar connections', 'signatureVersion' => 'v4', 'signingName' => 'codestar-connections', 'targetPrefix' => 'com.amazonaws.codestar.connections.CodeStar_connections_20191201', 'uid' => 'codestar-connections-2019-12-01'], 'operations' => ['CreateConnection' => ['name' => 'CreateConnection', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'CreateConnectionInput'], 'output' => ['shape' => 'CreateConnectionOutput'], 'errors' => [['shape' => 'LimitExceededException'], ['shape' => 'ResourceNotFoundException'], ['shape' => 'ResourceUnavailableException']]], 'CreateHost' => ['name' => 'CreateHost', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'CreateHostInput'], 'output' => ['shape' => 'CreateHostOutput'], 'errors' => [['shape' => 'LimitExceededException']]], 'DeleteConnection' => ['name' => 'DeleteConnection', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'DeleteConnectionInput'], 'output' => ['shape' => 'DeleteConnectionOutput'], 'errors' => [['shape' => 'ResourceNotFoundException']]], 'DeleteHost' => ['name' => 'DeleteHost', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'DeleteHostInput'], 'output' => ['shape' => 'DeleteHostOutput'], 'errors' => [['shape' => 'ResourceNotFoundException'], ['shape' => 'ResourceUnavailableException']]], 'GetConnection' => ['name' => 'GetConnection', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'GetConnectionInput'], 'output' => ['shape' => 'GetConnectionOutput'], 'errors' => [['shape' => 'ResourceNotFoundException'], ['shape' => 'ResourceUnavailableException']]], 'GetHost' => ['name' => 'GetHost', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'GetHostInput'], 'output' => ['shape' => 'GetHostOutput'], 'errors' => [['shape' => 'ResourceNotFoundException'], ['shape' => 'ResourceUnavailableException']]], 'ListConnections' => ['name' => 'ListConnections', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'ListConnectionsInput'], 'output' => ['shape' => 'ListConnectionsOutput']], 'ListHosts' => ['name' => 'ListHosts', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'ListHostsInput'], 'output' => ['shape' => 'ListHostsOutput']], 'ListTagsForResource' => ['name' => 'ListTagsForResource', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'ListTagsForResourceInput'], 'output' => ['shape' => 'ListTagsForResourceOutput'], 'errors' => [['shape' => 'ResourceNotFoundException']]], 'TagResource' => ['name' => 'TagResource', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'TagResourceInput'], 'output' => ['shape' => 'TagResourceOutput'], 'errors' => [['shape' => 'ResourceNotFoundException'], ['shape' => 'LimitExceededException']]], 'UntagResource' => ['name' => 'UntagResource', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'UntagResourceInput'], 'output' => ['shape' => 'UntagResourceOutput'], 'errors' => [['shape' => 'ResourceNotFoundException']]], 'UpdateHost' => ['name' => 'UpdateHost', 'http' => ['method' => 'POST', 'requestUri' => '/'], 'input' => ['shape' => 'UpdateHostInput'], 'output' => ['shape' => 'UpdateHostOutput'], 'errors' => [['shape' => 'ConflictException'], ['shape' => 'ResourceNotFoundException'], ['shape' => 'ResourceUnavailableException'], ['shape' => 'UnsupportedOperationException']]]], 'shapes' => ['AccountId' => ['type' => 'string', 'max' => 12, 'min' => 12, 'pattern' => '[0-9]{12}'], 'AmazonResourceName' => ['type' => 'string', 'max' => 1011, 'min' => 1, 'pattern' => 'arn:aws(-[\\w]+)*:.+:.+:[0-9]{12}:.+'], 'ConflictException' => ['type' => 'structure', 'members' => ['Message' => ['shape' => 'ErrorMessage']], 'exception' => \true], 'Connection' => ['type' => 'structure', 'members' => ['ConnectionName' => ['shape' => 'ConnectionName'], 'ConnectionArn' => ['shape' => 'ConnectionArn'], 'ProviderType' => ['shape' => 'ProviderType'], 'OwnerAccountId' => ['shape' => 'AccountId'], 'ConnectionStatus' => ['shape' => 'ConnectionStatus'], 'HostArn' => ['shape' => 'HostArn']]], 'ConnectionArn' => ['type' => 'string', 'max' => 256, 'min' => 0, 'pattern' => 'arn:aws(-[\\w]+)*:.+:.+:[0-9]{12}:.+'], 'ConnectionList' => ['type' => 'list', 'member' => ['shape' => 'Connection']], 'ConnectionName' => ['type' => 'string', 'max' => 32, 'min' => 1, 'pattern' => '[\\s\\S]*'], 'ConnectionStatus' => ['type' => 'string', 'enum' => ['PENDING', 'AVAILABLE', 'ERROR']], 'CreateConnectionInput' => ['type' => 'structure', 'required' => ['ConnectionName'], 'members' => ['ProviderType' => ['shape' => 'ProviderType'], 'ConnectionName' => ['shape' => 'ConnectionName'], 'Tags' => ['shape' => 'TagList'], 'HostArn' => ['shape' => 'HostArn']]], 'CreateConnectionOutput' => ['type' => 'structure', 'required' => ['ConnectionArn'], 'members' => ['ConnectionArn' => ['shape' => 'ConnectionArn'], 'Tags' => ['shape' => 'TagList']]], 'CreateHostInput' => ['type' => 'structure', 'required' => ['Name', 'ProviderType', 'ProviderEndpoint'], 'members' => ['Name' => ['shape' => 'HostName'], 'ProviderType' => ['shape' => 'ProviderType'], 'ProviderEndpoint' => ['shape' => 'Url'], 'VpcConfiguration' => ['shape' => 'VpcConfiguration'], 'Tags' => ['shape' => 'TagList']]], 'CreateHostOutput' => ['type' => 'structure', 'members' => ['HostArn' => ['shape' => 'HostArn'], 'Tags' => ['shape' => 'TagList']]], 'DeleteConnectionInput' => ['type' => 'structure', 'required' => ['ConnectionArn'], 'members' => ['ConnectionArn' => ['shape' => 'ConnectionArn']]], 'DeleteConnectionOutput' => ['type' => 'structure', 'members' => []], 'DeleteHostInput' => ['type' => 'structure', 'required' => ['HostArn'], 'members' => ['HostArn' => ['shape' => 'HostArn']]], 'DeleteHostOutput' => ['type' => 'structure', 'members' => []], 'ErrorMessage' => ['type' => 'string', 'max' => 600], 'GetConnectionInput' => ['type' => 'structure', 'required' => ['ConnectionArn'], 'members' => ['ConnectionArn' => ['shape' => 'ConnectionArn']]], 'GetConnectionOutput' => ['type' => 'structure', 'members' => ['Connection' => ['shape' => 'Connection']]], 'GetHostInput' => ['type' => 'structure', 'required' => ['HostArn'], 'members' => ['HostArn' => ['shape' => 'HostArn']]], 'GetHostOutput' => ['type' => 'structure', 'members' => ['Name' => ['shape' => 'HostName'], 'Status' => ['shape' => 'HostStatus'], 'ProviderType' => ['shape' => 'ProviderType'], 'ProviderEndpoint' => ['shape' => 'Url'], 'VpcConfiguration' => ['shape' => 'VpcConfiguration']]], 'Host' => ['type' => 'structure', 'members' => ['Name' => ['shape' => 'HostName'], 'HostArn' => ['shape' => 'HostArn'], 'ProviderType' => ['shape' => 'ProviderType'], 'ProviderEndpoint' => ['shape' => 'Url'], 'VpcConfiguration' => ['shape' => 'VpcConfiguration'], 'Status' => ['shape' => 'HostStatus'], 'StatusMessage' => ['shape' => 'HostStatusMessage']]], 'HostArn' => ['type' => 'string', 'max' => 256, 'min' => 0, 'pattern' => 'arn:aws(-[\\w]+)*:codestar-connections:.+:[0-9]{12}:host\\/.+'], 'HostList' => ['type' => 'list', 'member' => ['shape' => 'Host']], 'HostName' => ['type' => 'string', 'max' => 64, 'min' => 1, 'pattern' => '.*'], 'HostStatus' => ['type' => 'string', 'max' => 64, 'min' => 1, 'pattern' => '.*'], 'HostStatusMessage' => ['type' => 'string'], 'LimitExceededException' => ['type' => 'structure', 'members' => ['Message' => ['shape' => 'ErrorMessage']], 'exception' => \true], 'ListConnectionsInput' => ['type' => 'structure', 'members' => ['ProviderTypeFilter' => ['shape' => 'ProviderType'], 'HostArnFilter' => ['shape' => 'HostArn'], 'MaxResults' => ['shape' => 'MaxResults'], 'NextToken' => ['shape' => 'NextToken']]], 'ListConnectionsOutput' => ['type' => 'structure', 'members' => ['Connections' => ['shape' => 'ConnectionList'], 'NextToken' => ['shape' => 'NextToken']]], 'ListHostsInput' => ['type' => 'structure', 'members' => ['MaxResults' => ['shape' => 'MaxResults'], 'NextToken' => ['shape' => 'NextToken']]], 'ListHostsOutput' => ['type' => 'structure', 'members' => ['Hosts' => ['shape' => 'HostList'], 'NextToken' => ['shape' => 'NextToken']]], 'ListTagsForResourceInput' => ['type' => 'structure', 'required' => ['ResourceArn'], 'members' => ['ResourceArn' => ['shape' => 'AmazonResourceName']]], 'ListTagsForResourceOutput' => ['type' => 'structure', 'members' => ['Tags' => ['shape' => 'TagList']]], 'MaxResults' => ['type' => 'integer', 'max' => 100, 'min' => 0], 'NextToken' => ['type' => 'string', 'max' => 1024, 'min' => 1, 'pattern' => '.*'], 'ProviderType' => ['type' => 'string', 'enum' => ['Bitbucket', 'GitHub', 'GitHubEnterpriseServer']], 'ResourceNotFoundException' => ['type' => 'structure', 'members' => ['Message' => ['shape' => 'ErrorMessage']], 'exception' => \true], 'ResourceUnavailableException' => ['type' => 'structure', 'members' => ['Message' => ['shape' => 'ErrorMessage']], 'exception' => \true], 'SecurityGroupId' => ['type' => 'string', 'max' => 20, 'min' => 11, 'pattern' => 'sg-\\w{8}(\\w{9})?'], 'SecurityGroupIds' => ['type' => 'list', 'member' => ['shape' => 'SecurityGroupId'], 'max' => 10, 'min' => 1], 'SubnetId' => ['type' => 'string', 'max' => 24, 'min' => 15, 'pattern' => 'subnet-\\w{8}(\\w{9})?'], 'SubnetIds' => ['type' => 'list', 'member' => ['shape' => 'SubnetId'], 'max' => 10, 'min' => 1], 'Tag' => ['type' => 'structure', 'required' => ['Key', 'Value'], 'members' => ['Key' => ['shape' => 'TagKey'], 'Value' => ['shape' => 'TagValue']]], 'TagKey' => ['type' => 'string', 'max' => 128, 'min' => 1, 'pattern' => '.*'], 'TagKeyList' => ['type' => 'list', 'member' => ['shape' => 'TagKey'], 'max' => 200, 'min' => 0], 'TagList' => ['type' => 'list', 'member' => ['shape' => 'Tag'], 'max' => 200, 'min' => 0], 'TagResourceInput' => ['type' => 'structure', 'required' => ['ResourceArn', 'Tags'], 'members' => ['ResourceArn' => ['shape' => 'AmazonResourceName'], 'Tags' => ['shape' => 'TagList']]], 'TagResourceOutput' => ['type' => 'structure', 'members' => []], 'TagValue' => ['type' => 'string', 'max' => 256, 'min' => 0, 'pattern' => '.*'], 'TlsCertificate' => ['type' => 'string', 'max' => 16384, 'min' => 1, 'pattern' => '[\\s\\S]*'], 'UnsupportedOperationException' => ['type' => 'structure', 'members' => ['Message' => ['shape' => 'ErrorMessage']], 'exception' => \true], 'UntagResourceInput' => ['type' => 'structure', 'required' => ['ResourceArn', 'TagKeys'], 'members' => ['ResourceArn' => ['shape' => 'AmazonResourceName'], 'TagKeys' => ['shape' => 'TagKeyList']]], 'UntagResourceOutput' => ['type' => 'structure', 'members' => []], 'UpdateHostInput' => ['type' => 'structure', 'required' => ['HostArn'], 'members' => ['HostArn' => ['shape' => 'HostArn'], 'ProviderEndpoint' => ['shape' => 'Url'], 'VpcConfiguration' => ['shape' => 'VpcConfiguration']]], 'UpdateHostOutput' => ['type' => 'structure', 'members' => []], 'Url' => ['type' => 'string', 'max' => 512, 'min' => 1, 'pattern' => '.*'], 'VpcConfiguration' => ['type' => 'structure', 'required' => ['VpcId', 'SubnetIds', 'SecurityGroupIds'], 'members' => ['VpcId' => ['shape' => 'VpcId'], 'SubnetIds' => ['shape' => 'SubnetIds'], 'SecurityGroupIds' => ['shape' => 'SecurityGroupIds'], 'TlsCertificate' => ['shape' => 'TlsCertificate']]], 'VpcId' => ['type' => 'string', 'max' => 21, 'min' => 12, 'pattern' => 'vpc-\\w{8}(\\w{9})?']]];
